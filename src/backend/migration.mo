import List "mo:core/List";
import NewTypes "types/users";
import TestingTypes "types/testing";

module {
  // ── Old types (copied inline from .old/src/backend/types/) ─────────────────

  type OldUserRole = { #Admin; #Rider; #Analyst };

  type OldUserProfile = {
    principal : Principal;
    name : Text;
    role : OldUserRole;
    createdAt : Int; // Timestamp = Int
    username : ?Text;
    passwordHash : ?Text;
  };

  // ── Actor state shapes ──────────────────────────────────────────────────────

  type OldActor = {
    users : List.List<OldUserProfile>;
  };

  type NewActor = {
    users : List.List<NewTypes.UserProfile>;
  };

  // ── Migration function ──────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let users = old.users.map<OldUserProfile, NewTypes.UserProfile>(
      func(u) {
        {
          principal              = u.principal;
          name                   = u.name;
          role                   = u.role;
          createdAt              = u.createdAt;
          username               = u.username;
          passwordHash           = u.passwordHash;
          adminRating            = null;
          adminRatingComment     = null;
          adminRatingTimestamp   = null;
          aiScore                = null;
          aiScoreTimestamp       = null;
          aiScoreFactors         = null;
        }
      }
    );
    { users };
  };
};
