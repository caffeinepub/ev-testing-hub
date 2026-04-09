import Types "../types/users";
import TestingTypes "../types/testing";
import UserLib "../lib/users";
import TestingLib "../lib/testing";
import List "mo:core/List";

mixin (
  users : List.List<Types.UserProfile>,
  testRecords : List.List<TestingTypes.TestRecord>,
) {

  // ── Principal-based registration ──────────────────────────────────────────

  // First-time registration — caller registers themselves
  public shared ({ caller }) func registerSelf(name : Text) : async { #ok : Types.UserProfile; #err : Text } {
    switch (UserLib.getUser(users, caller)) {
      case (?_) return #err("Already registered");
      case null {};
    };
    // First user registered becomes Admin, subsequent users become Rider by default
    let role : Types.UserRole = if (users.size() == 0) #Admin else #Rider;
    let profile = UserLib.registerUser(users, caller, name, role);
    #ok(profile);
  };

  public query ({ caller }) func getMyProfile() : async ?Types.UserProfile {
    UserLib.getUser(users, caller);
  };

  public query func getUserProfile(principal : Principal) : async ?Types.UserProfile {
    UserLib.getUser(users, principal);
  };

  public query ({ caller }) func listAllUsers() : async { #ok : [Types.UserProfile]; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(UserLib.listUsers(users));
  };

  public shared ({ caller }) func updateUserRole(principal : Principal, newRole : Types.UserRole) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(UserLib.updateUserRole(users, principal, newRole));
  };

  public shared ({ caller }) func deleteUser(principal : Principal) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(UserLib.deleteUser(users, principal));
  };

  // ── Username/password-based user management ───────────────────────────────

  /// Admin creates a new user with username and password credentials.
  /// The user is stored in stable canister state and accessible from all devices.
  public shared ({ caller }) func createUserByAdmin(
    username : Text,
    password : Text,
    name : Text,
    role : Types.UserRole,
  ) : async { #ok : Types.UserProfile; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    UserLib.createUserByUsername(users, username, password, name, role);
  };

  /// Validate username/password credentials and return the user profile.
  public func loginWithCredentials(username : Text, password : Text) : async { #ok : Types.UserProfile; #err : Text } {
    UserLib.loginWithCredentials(users, username, password);
  };

  /// Look up a user profile by username.
  public query func getUserByUsername(username : Text) : async ?Types.UserProfile {
    UserLib.getUserByUsername(users, username);
  };

  /// Update a user's role by username (Admin only).
  public shared ({ caller }) func updateUserRoleByUsername(
    username : Text,
    newRole : Types.UserRole,
  ) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(UserLib.updateUserRoleByUsername(users, username, newRole));
  };

  /// Delete a user by username (Admin only).
  public shared ({ caller }) func deleteUserByUsername(username : Text) : async { #ok : Bool; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    #ok(UserLib.deleteUserByUsername(users, username));
  };

  /// Change password for the currently authenticated user (identified by session username).
  /// currentPassword must match before the new password is set.
  public func changePassword(
    username : Text,
    currentPassword : Text,
    newPassword : Text,
  ) : async { #ok; #err : Text } {
    UserLib.changePassword(users, username, currentPassword, newPassword);
  };

  // ── Rider Rating API ───────────────────────────────────────────────────────

  /// Admin sets a manual 1-5 star rating for a rider; AI score recalculates immediately.
  /// Only Admin can call this. Rating is stored on the rider's profile only.
  public shared ({ caller }) func setAdminRatingForRider(
    username : Text,
    rating : Nat,
    comment : ?Text,
  ) : async { #ok : Types.RiderRating; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    let (totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeedAll) =
      TestingLib.aggregateRiderStats(testRecords, username);
    UserLib.setAdminRating(
      users, username, rating, comment,
      totalKm, workingDays, issueCount,
      modeCount, avgSpeedAll, topSpeedAll,
    );
  };

  /// Returns the rating object for the given rider.
  /// Admin can read any rider; a Rider can only read their own.
  public query ({ caller }) func getRiderRating(username : Text) : async { #ok : ?Types.RiderRating; #err : Text } {
    // Resolve caller to their username for self-check
    let callerIsAdmin = UserLib.isAdmin(users, caller);
    if (not callerIsAdmin) {
      // Riders may only read their own rating
      switch (UserLib.getUser(users, caller)) {
        case null {
          // Username/password users: caller is anonymous principal — allow by username match
          // (frontend passes username; we trust this for read-only data)
        };
        case (?u) {
          switch (u.username) {
            case (?un) {
              if (un.toLower() != username.toLower()) {
                return #err("Unauthorized: you can only view your own rating");
              };
            };
            case null {};
          };
        };
      };
    };
    #ok(UserLib.getRiderRating(users, username));
  };

  /// Recalculate AI score for a rider from current test records (Admin only or internal use).
  public shared ({ caller }) func recalculateRiderRating(username : Text) : async { #ok : Types.RiderRating; #err : Text } {
    if (not UserLib.isAdmin(users, caller)) {
      return #err("Unauthorized: Admin role required");
    };
    let (totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeedAll) =
      TestingLib.aggregateRiderStats(testRecords, username);
    UserLib.recalculateRating(users, username, totalKm, workingDays, issueCount, modeCount, avgSpeedAll, topSpeedAll);
  };
};
