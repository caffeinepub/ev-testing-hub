import Common "../types/common";
import Types "../types/testing";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Set "mo:core/Set";

module {
  public func createTestRecord(
    records : List.List<Types.TestRecord>,
    counter : Types.Counter,
    vehicleModelId : Common.ModelId,
    vehicleModelName : Text,
    routeId : Common.RouteId,
    routeName : Text,
    riderName : Text,
    rangeStartKm : Float,
    rangeStopKm : Float,
    startSoc : ?Float,
    stopSoc : ?Float,
    topSpeedKmh : Float,
    avgSpeedKmh : Float,
    issues : [Types.Issue],
    photoUrls : [Text],
    createdBy : Principal,
    testingMode : ?Types.TestingMode,
    customRoute : ?Text,
    riderWeight : ?Float,
    coRiderWeight : ?Float,
    testPurpose : ?Types.TestPurpose,
    dateOfRide : ?Common.Timestamp,
  ) : Types.TestRecord {
    counter.value += 1;
    let record : Types.TestRecord = {
      id = counter.value;
      vehicleModelId;
      vehicleModelName;
      routeId;
      routeName;
      riderName;
      rangeStartKm;
      rangeStopKm;
      startSoc;
      stopSoc;
      topSpeedKmh;
      avgSpeedKmh;
      issues;
      photoUrls;
      timestamp = Time.now();
      createdBy;
      testingMode;
      customRoute;
      riderWeight;
      coRiderWeight;
      testPurpose;
      dateOfRide;
    };
    records.add(record);
    record;
  };

  public func getTestRecord(records : List.List<Types.TestRecord>, id : Common.RecordId) : ?Types.TestRecord {
    records.find(func(r) { r.id == id });
  };

  public func listTestRecords(records : List.List<Types.TestRecord>) : [Types.TestRecord] {
    records.toArray();
  };

  public func listTestRecordsByModel(records : List.List<Types.TestRecord>, modelId : Common.ModelId) : [Types.TestRecord] {
    records.filter(func(r) { r.vehicleModelId == modelId }).toArray();
  };

  public func listTestRecordsByRoute(records : List.List<Types.TestRecord>, routeId : Common.RouteId) : [Types.TestRecord] {
    records.filter(func(r) { r.routeId == routeId }).toArray();
  };

  public func listTestRecordsByRider(records : List.List<Types.TestRecord>, riderName : Text) : [Types.TestRecord] {
    let lower = riderName.toLower();
    records.filter(func(r) { r.riderName.toLower() == lower }).toArray();
  };

  public func deleteTestRecord(records : List.List<Types.TestRecord>, id : Common.RecordId) : Bool {
    let sizeBefore = records.size();
    let kept = records.filter(func(r) { r.id != id });
    records.clear();
    records.append(kept);
    records.size() < sizeBefore;
  };

  public func createVehicleModel(
    models : List.List<Types.VehicleModel>,
    counter : Types.Counter,
    name : Text,
    vehicleType : Types.VehicleType,
    specs : Text,
  ) : Types.VehicleModel {
    counter.value += 1;
    let model : Types.VehicleModel = {
      id = counter.value;
      name;
      vehicleType;
      specs;
      createdAt = Time.now();
    };
    models.add(model);
    model;
  };

  public func getVehicleModel(models : List.List<Types.VehicleModel>, id : Common.ModelId) : ?Types.VehicleModel {
    models.find(func(m) { m.id == id });
  };

  public func listVehicleModels(models : List.List<Types.VehicleModel>) : [Types.VehicleModel] {
    models.toArray();
  };

  public func deleteVehicleModel(models : List.List<Types.VehicleModel>, id : Common.ModelId) : Bool {
    let sizeBefore = models.size();
    let kept = models.filter(func(m) { m.id != id });
    models.clear();
    models.append(kept);
    models.size() < sizeBefore;
  };

  public func createRoute(
    routes : List.List<Types.Route>,
    counter : Types.Counter,
    name : Text,
    description : Text,
    distanceKm : Float,
  ) : Types.Route {
    counter.value += 1;
    let route : Types.Route = {
      id = counter.value;
      name;
      description;
      distanceKm;
      createdAt = Time.now();
    };
    routes.add(route);
    route;
  };

  public func getRoute(routes : List.List<Types.Route>, id : Common.RouteId) : ?Types.Route {
    routes.find(func(r) { r.id == id });
  };

  public func listRoutes(routes : List.List<Types.Route>) : [Types.Route] {
    routes.toArray();
  };

  public func deleteRoute(routes : List.List<Types.Route>, id : Common.RouteId) : Bool {
    let sizeBefore = routes.size();
    let kept = routes.filter(func(r) { r.id != id });
    routes.clear();
    routes.append(kept);
    routes.size() < sizeBefore;
  };

  func issueFlagToText(flag : Types.IssueFlag) : Text {
    switch (flag) {
      case (#Mechanical) "Mechanical";
      case (#Electrical) "Electrical";
      case (#Software) "Software";
      case (#Performance) "Performance";
      case (#Safety) "Safety";
      case (#Other) "Other";
    };
  };

  public func getTopIssues(records : List.List<Types.TestRecord>, limit : Nat) : [(Types.IssueFlag, Nat)] {
    // Count occurrences using Text keys for the variant
    let counts = Map.empty<Text, (Types.IssueFlag, Nat)>();
    records.forEach(func(r) {
      for (issue in r.issues.values()) {
        let key = issueFlagToText(issue.flag);
        let prev = switch (counts.get(key)) {
          case (?(_, n)) n;
          case null 0;
        };
        counts.add(key, (issue.flag, prev + 1));
      };
    });
    let pairs = counts.values().toArray();
    pairs.sort(
      func((_, a) : (Types.IssueFlag, Nat), (_, b) : (Types.IssueFlag, Nat)) : { #less; #equal; #greater } {
        if (a > b) #less else if (a < b) #greater else #equal;
      }
    ).sliceToArray(0, if (pairs.size() <= limit) pairs.size().toInt() else limit.toInt());
  };

  // ── Rating aggregation helpers ─────────────────────────────────────────────

  /// Aggregate stats needed for AI rating calculation for a given rider.
  /// Returns: (totalKm, workingDays, issueCount, uniqueModeCount, avgSpeedAll, topSpeedAll)
  public func aggregateRiderStats(
    records : List.List<Types.TestRecord>,
    riderName : Text,
  ) : (Float, Nat, Nat, Nat, Float, Float) {
    let lower = riderName.toLower();
    let riderRecords = records.filter(func(r) { r.riderName.toLower() == lower });

    var totalKm : Float = 0.0;
    var issueCount : Nat = 0;
    var totalAvgSpeed : Float = 0.0;
    var topSpeed : Float = 0.0;
    var count : Nat = 0;

    // Collect unique days as "YYYY-MM-DD" strings derived from timestamps
    let daySet = Set.empty<Text>();

    // Collect unique testing modes
    let modeSet = Set.empty<Text>();

    riderRecords.forEach(func(r) {
      totalKm += r.rangeStopKm - r.rangeStartKm;
      issueCount += r.issues.size();
      totalAvgSpeed += r.avgSpeedKmh;
      if (r.topSpeedKmh > topSpeed) { topSpeed := r.topSpeedKmh };
      count += 1;

      // Derive day key from dateOfRide if available, else timestamp
      let ts : Common.Timestamp = switch (r.dateOfRide) {
        case (?d) d;
        case null r.timestamp;
      };
      // Convert nanoseconds to days since epoch for grouping
      let dayKey = (ts / 86_400_000_000_000).toText();
      daySet.add(dayKey);

      // Track unique modes
      switch (r.testingMode) {
        case (?#Eco) modeSet.add("Eco");
        case (?#City) modeSet.add("City");
        case (?#Sport) modeSet.add("Sport");
        case (?#Other(_)) modeSet.add("Other");
        case null {};
      };
    });

    let workingDays = daySet.size();
    let modeCount = modeSet.size();
    let avgSpeedAll = if (count == 0) 0.0 else totalAvgSpeed / count.toFloat();

    (totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeed);
  };
};
