import Common "../types/common";
import TestingTypes "../types/testing";
import UserTypes "../types/users";
import TestingLib "../lib/testing";
import UserLib "../lib/users";
import List "mo:core/List";

mixin (
  testRecords : List.List<TestingTypes.TestRecord>,
  vehicleModels : List.List<TestingTypes.VehicleModel>,
  routes : List.List<TestingTypes.Route>,
  users : List.List<UserTypes.UserProfile>,
  testRecordCounter : TestingTypes.Counter,
  modelCounter : TestingTypes.Counter,
  routeCounter : TestingTypes.Counter,
) {

  // ── Internal helper: recalculate AI score for a rider after a new record ──

  func triggerRatingRecalc(riderName : Text) {
    let (totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeedAll) =
      TestingLib.aggregateRiderStats(testRecords, riderName);
    ignore UserLib.recalculateRating(users, riderName, totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeedAll);
  };

  // --- Vehicle Models ---

  public shared ({ caller }) func addVehicleModel(
    name : Text,
    vehicleType : TestingTypes.VehicleType,
    specs : Text,
  ) : async { #ok : TestingTypes.VehicleModel; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.createVehicleModel(vehicleModels, modelCounter, name, vehicleType, specs));
  };

  public query func getVehicleModel(id : Common.ModelId) : async ?TestingTypes.VehicleModel {
    TestingLib.getVehicleModel(vehicleModels, id);
  };

  public query func listVehicleModels() : async [TestingTypes.VehicleModel] {
    TestingLib.listVehicleModels(vehicleModels);
  };

  public shared ({ caller }) func deleteVehicleModel(id : Common.ModelId) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.deleteVehicleModel(vehicleModels, id));
  };

  // --- Routes ---

  public shared ({ caller }) func addRoute(
    name : Text,
    description : Text,
    distanceKm : Float,
  ) : async { #ok : TestingTypes.Route; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.createRoute(routes, routeCounter, name, description, distanceKm));
  };

  public query func getRoute(id : Common.RouteId) : async ?TestingTypes.Route {
    TestingLib.getRoute(routes, id);
  };

  public query func listRoutes() : async [TestingTypes.Route] {
    TestingLib.listRoutes(routes);
  };

  public shared ({ caller }) func deleteRoute(id : Common.RouteId) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.deleteRoute(routes, id));
  };

  // --- Test Records ---

  // Rider submits their own test record.
  // dateOfRide: optional milliseconds-since-epoch from a frontend date picker;
  //   backend converts to nanoseconds (ms * 1_000_000). Null defaults to Time.now().
  public shared ({ caller }) func submitTestRecord(
    vehicleModelId : Common.ModelId,
    routeId : Common.RouteId,
    riderName : Text,
    rangeStartKm : Float,
    rangeStopKm : Float,
    startSoc : ?Float,
    stopSoc : ?Float,
    topSpeedKmh : Float,
    avgSpeedKmh : Float,
    issues : [TestingTypes.Issue],
    photoUrls : ?[Text],
    testingMode : ?TestingTypes.TestingMode,
    customRoute : ?Text,
    riderWeight : ?Float,
    coRiderWeight : ?Float,
    testPurpose : ?TestingTypes.TestPurpose,
    dateOfRide : ?Int,
  ) : async { #ok : TestingTypes.TestRecord; #err : Text } {
    let modelName = switch (TestingLib.getVehicleModel(vehicleModels, vehicleModelId)) {
      case (?m) m.name;
      case null return #err("Vehicle model not found");
    };
    let routeName = switch (TestingLib.getRoute(routes, routeId)) {
      case (?r) r.name;
      case null return #err("Route not found");
    };
    let photos = switch (photoUrls) { case (?p) p; case null [] };
    let rideTs : ?Common.Timestamp = switch (dateOfRide) {
      case (?ms) ?(ms * 1_000_000);
      case null null;
    };
    let record = TestingLib.createTestRecord(
      testRecords, testRecordCounter,
      vehicleModelId, modelName, routeId, routeName,
      riderName, rangeStartKm, rangeStopKm,
      startSoc, stopSoc, topSpeedKmh, avgSpeedKmh,
      issues, photos, caller,
      testingMode, customRoute, riderWeight, coRiderWeight, testPurpose, rideTs,
    );
    // Recalculate AI rating after new record
    triggerRatingRecalc(riderName);
    #ok(record);
  };

  // Admin can create a test record for any principal/rider.
  // dateOfRide: optional milliseconds-since-epoch from a frontend date picker;
  //   backend converts to nanoseconds (ms * 1_000_000). Null defaults to Time.now().
  public shared ({ caller }) func adminCreateTestRecord(
    vehicleModelId : Common.ModelId,
    routeId : Common.RouteId,
    riderName : Text,
    rangeStartKm : Float,
    rangeStopKm : Float,
    startSoc : ?Float,
    stopSoc : ?Float,
    topSpeedKmh : Float,
    avgSpeedKmh : Float,
    issues : [TestingTypes.Issue],
    photoUrls : ?[Text],
    testingMode : ?TestingTypes.TestingMode,
    customRoute : ?Text,
    riderWeight : ?Float,
    coRiderWeight : ?Float,
    testPurpose : ?TestingTypes.TestPurpose,
    dateOfRide : ?Int,
  ) : async { #ok : TestingTypes.TestRecord; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    let modelName = switch (TestingLib.getVehicleModel(vehicleModels, vehicleModelId)) {
      case (?m) m.name;
      case null return #err("Vehicle model not found");
    };
    let routeName = switch (TestingLib.getRoute(routes, routeId)) {
      case (?r) r.name;
      case null return #err("Route not found");
    };
    let photos = switch (photoUrls) { case (?p) p; case null [] };
    let rideTs : ?Common.Timestamp = switch (dateOfRide) {
      case (?ms) ?(ms * 1_000_000);
      case null null;
    };
    let record = TestingLib.createTestRecord(
      testRecords, testRecordCounter,
      vehicleModelId, modelName, routeId, routeName,
      riderName, rangeStartKm, rangeStopKm,
      startSoc, stopSoc, topSpeedKmh, avgSpeedKmh,
      issues, photos, caller,
      testingMode, customRoute, riderWeight, coRiderWeight, testPurpose, rideTs,
    );
    // Recalculate AI rating after new record
    triggerRatingRecalc(riderName);
    #ok(record);
  };

  public query ({ caller }) func getTestRecord(id : Common.RecordId) : async { #ok : ?TestingTypes.TestRecord; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.getTestRecord(testRecords, id));
  };

  public query ({ caller }) func listTestRecords() : async { #ok : [TestingTypes.TestRecord]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.listTestRecords(testRecords));
  };

  public query ({ caller }) func listTestRecordsByModel(modelId : Common.ModelId) : async { #ok : [TestingTypes.TestRecord]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.listTestRecordsByModel(testRecords, modelId));
  };

  public query ({ caller }) func listTestRecordsByRoute(routeId : Common.RouteId) : async { #ok : [TestingTypes.TestRecord]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.listTestRecordsByRoute(testRecords, routeId));
  };

  public query ({ caller }) func listTestRecordsByRider(riderName : Text) : async { #ok : [TestingTypes.TestRecord]; #err : Text } {
    #ok(TestingLib.listTestRecordsByRider(testRecords, riderName));
  };

  public query ({ caller }) func listTestRecordsByIssue(issueFlag : TestingTypes.IssueFlag) : async { #ok : [TestingTypes.TestRecord]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.listTestRecordsByIssue(testRecords, issueFlag));
  };

  public shared ({ caller }) func deleteTestRecord(id : Common.RecordId) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.deleteTestRecord(testRecords, id));
  };

  // --- Analytics ---

  public query ({ caller }) func getTopIssues(limit : Nat) : async { #ok : [(TestingTypes.IssueFlag, Nat)]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(TestingLib.getTopIssues(testRecords, limit));
  };
};
