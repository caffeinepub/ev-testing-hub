import Common "common";

module {
  public type UserRole = {
    #Admin;
    #Rider;
    #Analyst;
  };

  /// Aggregated factors used when computing the AI score — stored for transparency.
  public type AiScoreFactors = {
    totalKm : Float;
    workingDays : Nat;
    issueCount : Nat;
    behaviorScore : Float; // 0.0-1.0 normalised
  };

  /// Shared rating object returned by getRiderRating.
  public type RiderRating = {
    username : Text;
    adminRating : ?Nat; // 1-5 or null
    adminRatingComment : ?Text;
    adminRatingTimestamp : ?Common.Timestamp;
    aiScore : ?Float; // 1.0-5.0 or null
    aiScoreTimestamp : ?Common.Timestamp;
    aiScoreFactors : ?AiScoreFactors;
  };

  public type UserProfile = {
    principal : Principal;
    name : Text;
    role : UserRole;
    createdAt : Common.Timestamp;
    // Optional fields for username/password-based users (not production security)
    username : ?Text;
    passwordHash : ?Text; // stored as plain text; label makes intent explicit
    // Rating fields — profile only, never included in exports
    adminRating : ?Nat; // 1-5 stars set by Admin
    adminRatingComment : ?Text;
    adminRatingTimestamp : ?Common.Timestamp;
    aiScore : ?Float; // 1.0-5.0 calculated by AI logic
    aiScoreTimestamp : ?Common.Timestamp;
    aiScoreFactors : ?AiScoreFactors;
  };
};
