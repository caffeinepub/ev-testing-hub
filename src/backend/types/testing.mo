import Common "common";

module {
  public type IssueFlag = {
    #Mechanical;
    #Electrical;
    #Software;
    #Performance;
    #Safety;
    #Other;
  };

  public type Issue = {
    flag : IssueFlag;
    description : Text;
  };

  public type VehicleType = {
    #TwoWheeler;
    #ThreeWheeler;
  };

  public type VehicleModel = {
    id : Common.ModelId;
    name : Text;
    vehicleType : VehicleType;
    specs : Text;
    createdAt : Common.Timestamp;
  };

  public type Route = {
    id : Common.RouteId;
    name : Text;
    description : Text;
    distanceKm : Float;
    createdAt : Common.Timestamp;
  };

  public type TestingMode = {
    #Eco;
    #City;
    #Sport;
    #Other : Text;
  };

  public type TestPurpose = {
    #Range;
    #Durability;
    #ComponentTest;
    #Others : Text;
  };

  public type TestRecord = {
    id : Common.RecordId;
    vehicleModelId : Common.ModelId;
    vehicleModelName : Text;
    routeId : Common.RouteId;
    routeName : Text;
    riderName : Text;
    rangeStartKm : Float;
    rangeStopKm : Float;
    startSoc : ?Float;
    stopSoc : ?Float;
    topSpeedKmh : Float;
    avgSpeedKmh : Float;
    issues : [Issue];
    // Photo file IDs/URLs from object-storage extension (empty array = no photos)
    photoUrls : [Text];
    timestamp : Common.Timestamp;
    createdBy : Principal;
    // New fields — optional for backward compatibility with existing records
    testingMode : ?TestingMode;
    customRoute : ?Text;
    riderWeight : ?Float;
    coRiderWeight : ?Float;
    testPurpose : ?TestPurpose;
    // User-provided date of ride (nanoseconds since epoch); null = use server timestamp
    dateOfRide : ?Common.Timestamp;
  };

  public type Counter = { var value : Nat };
};
