import List "mo:core/List";
import TestingTypes "types/testing";
import UserTypes "types/users";
import TestingMixin "mixins/testing-api";
import UsersMixin "mixins/users-api";
import UserLib "lib/users";





actor {
  let testRecords = List.empty<TestingTypes.TestRecord>();
  let vehicleModels = List.empty<TestingTypes.VehicleModel>();
  let routes = List.empty<TestingTypes.Route>();
  let users = List.empty<UserTypes.UserProfile>();

  let testRecordCounter : TestingTypes.Counter = { var value = 0 };
  let modelCounter : TestingTypes.Counter = { var value = 0 };
  let routeCounter : TestingTypes.Counter = { var value = 0 };

  // Seed default Admin user (Admin/Admin123) on canister init
  UserLib.seedDefaultAdmin(users);

  include TestingMixin(testRecords, vehicleModels, routes, users, testRecordCounter, modelCounter, routeCounter);
  include UsersMixin(users, testRecords);
};
