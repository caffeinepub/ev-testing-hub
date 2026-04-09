import Common "../types/common";
import Types "../types/users";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

module {
  // ── Principal-based registration ──────────────────────────────────────────

  public func registerUser(
    users : List.List<Types.UserProfile>,
    principal : Principal,
    name : Text,
    role : Types.UserRole,
  ) : Types.UserProfile {
    let profile : Types.UserProfile = {
      principal;
      name;
      role;
      createdAt = Time.now();
      username = null;
      passwordHash = null;
      adminRating = null;
      adminRatingComment = null;
      adminRatingTimestamp = null;
      aiScore = null;
      aiScoreTimestamp = null;
      aiScoreFactors = null;
    };
    users.add(profile);
    profile;
  };

  public func getUser(users : List.List<Types.UserProfile>, principal : Principal) : ?Types.UserProfile {
    users.find(func(u) { u.principal == principal });
  };

  public func listUsers(users : List.List<Types.UserProfile>) : [Types.UserProfile] {
    users.toArray();
  };

  public func updateUserRole(
    users : List.List<Types.UserProfile>,
    principal : Principal,
    newRole : Types.UserRole,
  ) : Bool {
    var found = false;
    users.mapInPlace(func(u) {
      if (u.principal == principal) {
        found := true;
        { u with role = newRole };
      } else u;
    });
    found;
  };

  public func deleteUser(users : List.List<Types.UserProfile>, principal : Principal) : Bool {
    let sizeBefore = users.size();
    let kept = users.filter(func(u) { u.principal != principal });
    users.clear();
    users.append(kept);
    users.size() < sizeBefore;
  };

  public func hasRole(users : List.List<Types.UserProfile>, principal : Principal, role : Types.UserRole) : Bool {
    switch (users.find(func(u) { u.principal == principal })) {
      case (?u) u.role == role;
      case null false;
    };
  };

  public func isAdmin(users : List.List<Types.UserProfile>, principal : Principal) : Bool {
    hasRole(users, principal, #Admin);
  };

  // ── Username/password-based user management ───────────────────────────────

  /// Create a user with username and password. Uses anonymous principal as placeholder.
  /// NOTE: password is stored as plain text — not for production security.
  public func createUserByUsername(
    users : List.List<Types.UserProfile>,
    username : Text,
    password : Text,
    name : Text,
    role : Types.UserRole,
  ) : { #ok : Types.UserProfile; #err : Text } {
    // Reject duplicate usernames (case-insensitive)
    let lowerUsername = username.toLower();
    switch (users.find(func(u) {
      switch (u.username) {
        case (?un) un.toLower() == lowerUsername;
        case null false;
      };
    })) {
      case (?_) return #err("Username already exists");
      case null {};
    };
    let profile : Types.UserProfile = {
      principal = Principal.anonymous();
      name;
      role;
      createdAt = Time.now();
      username = ?username;
      passwordHash = ?password; // plain text — not production security
      adminRating = null;
      adminRatingComment = null;
      adminRatingTimestamp = null;
      aiScore = null;
      aiScoreTimestamp = null;
      aiScoreFactors = null;
    };
    users.add(profile);
    #ok(profile);
  };

  /// Validate credentials and return the matching profile.
  public func loginWithCredentials(
    users : List.List<Types.UserProfile>,
    username : Text,
    password : Text,
  ) : { #ok : Types.UserProfile; #err : Text } {
    let lowerUsername = username.toLower();
    switch (users.find(func(u) {
      switch (u.username) {
        case (?un) un.toLower() == lowerUsername;
        case null false;
      };
    })) {
      case null #err("Invalid username or password");
      case (?u) {
        switch (u.passwordHash) {
          case null #err("Invalid username or password");
          case (?hash) {
            if (hash == password) #ok(u)
            else #err("Invalid username or password");
          };
        };
      };
    };
  };

  /// Find a user by username (case-insensitive).
  public func getUserByUsername(
    users : List.List<Types.UserProfile>,
    username : Text,
  ) : ?Types.UserProfile {
    let lowerUsername = username.toLower();
    users.find(func(u) {
      switch (u.username) {
        case (?un) un.toLower() == lowerUsername;
        case null false;
      };
    });
  };

  /// Update role by username.
  public func updateUserRoleByUsername(
    users : List.List<Types.UserProfile>,
    username : Text,
    newRole : Types.UserRole,
  ) : Bool {
    let lowerUsername = username.toLower();
    var found = false;
    users.mapInPlace(func(u) {
      switch (u.username) {
        case (?un) {
          if (un.toLower() == lowerUsername) {
            found := true;
            { u with role = newRole };
          } else u;
        };
        case null u;
      };
    });
    found;
  };

  /// Delete user by username.
  public func deleteUserByUsername(
    users : List.List<Types.UserProfile>,
    username : Text,
  ) : Bool {
    let lowerUsername = username.toLower();
    let sizeBefore = users.size();
    let kept = users.filter(func(u) {
      switch (u.username) {
        case (?un) un.toLower() != lowerUsername;
        case null true;
      };
    });
    users.clear();
    users.append(kept);
    users.size() < sizeBefore;
  };

  /// Change password for a user identified by username.
  /// Verifies the current password before updating. Returns #err if wrong.
  public func changePassword(
    users : List.List<Types.UserProfile>,
    username : Text,
    currentPassword : Text,
    newPassword : Text,
  ) : { #ok; #err : Text } {
    let lowerUsername = username.toLower();
    switch (users.find(func(u) {
      switch (u.username) {
        case (?un) un.toLower() == lowerUsername;
        case null false;
      };
    })) {
      case null #err("User not found");
      case (?u) {
        switch (u.passwordHash) {
          case null #err("User has no password set");
          case (?hash) {
            if (hash != currentPassword) return #err("Current password is incorrect");
            users.mapInPlace(func(p) {
              switch (p.username) {
                case (?un) {
                  if (un.toLower() == lowerUsername) { { p with passwordHash = ?newPassword } }
                  else p;
                };
                case null p;
              };
            });
            #ok;
          };
        };
      };
    };
  };

  /// Seed the default Admin user (Admin/Admin123) if no users exist yet.
  public func seedDefaultAdmin(users : List.List<Types.UserProfile>) {
    // Only seed if no username-based Admin exists
    let adminExists = switch (getUserByUsername(users, "Admin")) {
      case (?_) true;
      case null false;
    };
    if (not adminExists) {
      let profile : Types.UserProfile = {
        principal = Principal.anonymous();
        name = "Admin";
        role = #Admin;
        createdAt = Time.now();
        username = ?"Admin";
        passwordHash = ?"Admin123";
        adminRating = null;
        adminRatingComment = null;
        adminRatingTimestamp = null;
        aiScore = null;
        aiScoreTimestamp = null;
        aiScoreFactors = null;
      };
      users.add(profile);
    };
  };

  // ── Rating helpers ─────────────────────────────────────────────────────────

  /// Compute a clamped normalised value in [0.0, 1.0] using a simple linear
  /// scale where `ref` is the reference "excellent" value.
  func normalise(value : Float, ref : Float) : Float {
    if (ref <= 0.0) return 0.0;
    let n = value / ref;
    if (n > 1.0) 1.0 else n;
  };

  /// Calculate the AI score (1.0 – 5.0) for a rider given aggregated stats.
  ///
  /// Weights:
  ///   KM            25 %
  ///   workingDays   25 %
  ///   issues(inv.)  20 %  (fewer issues → higher score)
  ///   adminRating   20 %  (if present; otherwise redistributed to KM+days)
  ///   behavior      10 %
  ///
  /// Reference points (= "excellent" value that maps to normalised 1.0):
  ///   totalKm      5000 km
  ///   workingDays   100 days
  ///   issueCount     50 issues  (inverted: 0 issues → 1.0)
  public func calculateAiScore(
    totalKm : Float,
    workingDays : Nat,
    issueCount : Nat,
    behaviorScore : Float, // 0.0 – 1.0 already normalised
    adminRatingOpt : ?Nat,  // 1-5 or null
  ) : Float {
    let kmNorm       = normalise(totalKm, 5000.0);
    let daysNorm     = normalise(workingDays.toFloat(), 100.0);
    let issueNorm    = 1.0 - normalise(issueCount.toFloat(), 50.0);
    let behaviorNorm = if (behaviorScore < 0.0) 0.0 else if (behaviorScore > 1.0) 1.0 else behaviorScore;

    let raw : Float = switch (adminRatingOpt) {
      case null {
        // No admin rating — redistribute its 20 % equally to KM and workingDays
        kmNorm * 0.35 + daysNorm * 0.35 + issueNorm * 0.20 + behaviorNorm * 0.10
      };
      case (?ar) {
        let adminNorm = (ar.toFloat() - 1.0) / 4.0; // map 1-5 → 0-1
        kmNorm * 0.25 + daysNorm * 0.25 + issueNorm * 0.20 + adminNorm * 0.20 + behaviorNorm * 0.10
      };
    };

    // Map 0-1 → 1.0-5.0 and clamp
    let score = 1.0 + raw * 4.0;
    if (score < 1.0) 1.0 else if (score > 5.0) 5.0 else score;
  };

  /// Compute a simple behavior score (0.0 – 1.0) from an array of test records.
  /// Uses variety of testing modes as a positive signal and speed variance as a
  /// neutral metric.  More modes tried → higher score up to cap.
  public func computeBehaviorScore(modeCount : Nat, avgSpeed : Float, topSpeed : Float) : Float {
    // Variety score: each unique mode tried adds 0.25 (max 4 modes = 1.0)
    let varietyScore = normalise(modeCount.toFloat(), 4.0);
    // Speed ratio: avgSpeed / topSpeed → higher ratio = smoother driving
    let speedRatio = if (topSpeed <= 0.0) 0.5 else {
      let r = avgSpeed / topSpeed;
      if (r > 1.0) 1.0 else r;
    };
    varietyScore * 0.6 + speedRatio * 0.4;
  };

  /// Store the admin rating on a rider profile and recalculate the AI score
  /// using the provided pre-aggregated stats.
  /// Returns #err if the username is not found.
  public func setAdminRating(
    users : List.List<Types.UserProfile>,
    username : Text,
    rating : Nat,
    comment : ?Text,
    // Aggregated stats supplied by the caller (from test records)
    totalKm : Float,
    workingDays : Nat,
    issueCount : Nat,
    modeCount : Nat,
    avgSpeedAll : Float,
    topSpeedAll : Float,
  ) : { #ok : Types.RiderRating; #err : Text } {
    if (rating < 1 or rating > 5) return #err("Rating must be between 1 and 5");
    let lowerUsername = username.toLower();
    var resultOpt : ?Types.RiderRating = null;
    var found = false;
    users.mapInPlace(func(u) {
      switch (u.username) {
        case (?un) {
          if (un.toLower() == lowerUsername) {
            found := true;
            let bScore = computeBehaviorScore(modeCount, avgSpeedAll, topSpeedAll);
            let factors : Types.AiScoreFactors = {
              totalKm;
              workingDays;
              issueCount;
              behaviorScore = bScore;
            };
            let score = calculateAiScore(totalKm, workingDays, issueCount, bScore, ?rating);
            let now = Time.now();
            let updated : Types.UserProfile = {
              u with
              adminRating = ?rating;
              adminRatingComment = comment;
              adminRatingTimestamp = ?now;
              aiScore = ?score;
              aiScoreTimestamp = ?now;
              aiScoreFactors = ?factors;
            };
            resultOpt := ?{
              username = un;
              adminRating = ?rating;
              adminRatingComment = comment;
              adminRatingTimestamp = ?now;
              aiScore = ?score;
              aiScoreTimestamp = ?now;
              aiScoreFactors = ?factors;
            };
            updated;
          } else u;
        };
        case null u;
      };
    });
    if (not found) return #err("User not found");
    switch (resultOpt) {
      case (?r) #ok(r);
      case null #err("User not found");
    };
  };

  /// Recalculate the AI score for a rider using fresh aggregated stats.
  /// Does NOT change the admin rating — only updates aiScore and aiScoreFactors.
  public func recalculateRating(
    users : List.List<Types.UserProfile>,
    username : Text,
    totalKm : Float,
    workingDays : Nat,
    issueCount : Nat,
    modeCount : Nat,
    avgSpeedAll : Float,
    topSpeedAll : Float,
  ) : { #ok : Types.RiderRating; #err : Text } {
    let lowerUsername = username.toLower();
    var resultOpt : ?Types.RiderRating = null;
    var found = false;
    users.mapInPlace(func(u) {
      switch (u.username) {
        case (?un) {
          if (un.toLower() == lowerUsername) {
            found := true;
            let bScore = computeBehaviorScore(modeCount, avgSpeedAll, topSpeedAll);
            let factors : Types.AiScoreFactors = {
              totalKm;
              workingDays;
              issueCount;
              behaviorScore = bScore;
            };
            let score = calculateAiScore(totalKm, workingDays, issueCount, bScore, u.adminRating);
            let now = Time.now();
            let updated : Types.UserProfile = {
              u with
              aiScore = ?score;
              aiScoreTimestamp = ?now;
              aiScoreFactors = ?factors;
            };
            resultOpt := ?{
              username = un;
              adminRating = u.adminRating;
              adminRatingComment = u.adminRatingComment;
              adminRatingTimestamp = u.adminRatingTimestamp;
              aiScore = ?score;
              aiScoreTimestamp = ?now;
              aiScoreFactors = ?factors;
            };
            updated;
          } else u;
        };
        case null u;
      };
    });
    if (not found) return #err("User not found");
    switch (resultOpt) {
      case (?r) #ok(r);
      case null #err("User not found");
    };
  };

  /// Return the rating snapshot for a rider.
  public func getRiderRating(
    users : List.List<Types.UserProfile>,
    username : Text,
  ) : ?Types.RiderRating {
    let lowerUsername = username.toLower();
    switch (users.find(func(u) {
      switch (u.username) {
        case (?un) un.toLower() == lowerUsername;
        case null false;
      };
    })) {
      case null null;
      case (?u) {
        let un = switch (u.username) { case (?x) x; case null username };
        ?{
          username = un;
          adminRating = u.adminRating;
          adminRatingComment = u.adminRatingComment;
          adminRatingTimestamp = u.adminRatingTimestamp;
          aiScore = u.aiScore;
          aiScoreTimestamp = u.aiScoreTimestamp;
          aiScoreFactors = u.aiScoreFactors;
        };
      };
    };
  };
};
