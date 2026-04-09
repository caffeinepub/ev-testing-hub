import type { backendInterface, IssueFlag, UserRole, VehicleType, TestRecord, Route, VehicleModel, UserProfile, Issue } from "../backend";

const mockPrincipal = { toText: () => "aaaaa-aa", _arr: new Uint8Array(29) } as any;

const mockRoutes: Route[] = [
  { id: BigInt(1), name: "Urban Loop Alpha", description: "City traffic test route", distanceKm: 25, createdAt: BigInt(Date.now()) },
  { id: BigInt(2), name: "Highway Sprint", description: "High speed highway route", distanceKm: 50, createdAt: BigInt(Date.now()) },
  { id: BigInt(3), name: "Hill Climb Beta", description: "Gradient performance test", distanceKm: 15, createdAt: BigInt(Date.now()) },
];

const mockModels: VehicleModel[] = [
  { id: BigInt(1), name: "EV-101", vehicleType: "TwoWheeler" as VehicleType, specs: "72V 40Ah Li-Ion, 3kW motor", createdAt: BigInt(Date.now()) },
  { id: BigInt(2), name: "EV-102", vehicleType: "TwoWheeler" as VehicleType, specs: "72V 50Ah Li-Ion, 4kW motor", createdAt: BigInt(Date.now()) },
  { id: BigInt(3), name: "EV-103", vehicleType: "ThreeWheeler" as VehicleType, specs: "96V 60Ah Li-Ion, 5kW motor", createdAt: BigInt(Date.now()) },
  { id: BigInt(4), name: "EV-104", vehicleType: "ThreeWheeler" as VehicleType, specs: "96V 60Ah Li-Ion, 6kW motor", createdAt: BigInt(Date.now()) },
];

const mockIssues: Issue[] = [
  { flag: "Electrical" as IssueFlag, description: "Battery Pack Overheating (EV-102)" },
  { flag: "Electrical" as IssueFlag, description: "Motor Controller Fault (EV-205)" },
  { flag: "Software" as IssueFlag, description: "Low State of Charge Alert (EV-311)" },
  { flag: "Mechanical" as IssueFlag, description: "Tire Pressure Warning (EV-115)" },
  { flag: "Software" as IssueFlag, description: "GPS Signal Loss (EV-220)" },
];

const mockTestRecords: TestRecord[] = [
  {
    id: BigInt(1), vehicleModelId: BigInt(1), vehicleModelName: "EV-101", routeId: BigInt(1), routeName: "Urban Loop Alpha",
    riderName: "Rahul Singh", rangeStartKm: 0, rangeStopKm: 90, startSoc: 85, stopSoc: 42,
    topSpeedKmh: 65, avgSpeedKmh: 42, issues: [mockIssues[0]], photoUrls: [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal,
  },
  {
    id: BigInt(2), vehicleModelId: BigInt(2), vehicleModelName: "EV-102", routeId: BigInt(2), routeName: "Highway Sprint",
    riderName: "Priya Sharma", rangeStartKm: 0, rangeStopKm: 60, startSoc: 62, stopSoc: 28,
    topSpeedKmh: 72, avgSpeedKmh: 55, issues: [mockIssues[1], mockIssues[2]], photoUrls: [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal,
  },
  {
    id: BigInt(3), vehicleModelId: BigInt(3), vehicleModelName: "EV-103", routeId: BigInt(3), routeName: "Hill Climb Beta",
    riderName: "Amit Kumar", rangeStartKm: 0, rangeStopKm: 80, startSoc: 62, stopSoc: 30,
    topSpeedKmh: 55, avgSpeedKmh: 38, issues: [mockIssues[3]], photoUrls: [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal,
  },
  {
    id: BigInt(4), vehicleModelId: BigInt(4), vehicleModelName: "EV-104", routeId: BigInt(1), routeName: "Urban Loop Alpha",
    riderName: "Sneha Patel", rangeStartKm: 0, rangeStopKm: 60, startSoc: 48, stopSoc: 15,
    topSpeedKmh: 60, avgSpeedKmh: 45, issues: [mockIssues[4]], photoUrls: [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal,
  },
];

const mockUsers: UserProfile[] = [
  { principal: mockPrincipal, username: "Admin", name: "Admin User", role: "Admin" as UserRole, createdAt: BigInt(Date.now()) },
  { principal: mockPrincipal, username: "rahul.rider", name: "Rahul Singh", role: "Rider" as UserRole, createdAt: BigInt(Date.now()) },
  { principal: mockPrincipal, username: "alex.analyst", name: "Alex Chen", role: "Analyst" as UserRole, createdAt: BigInt(Date.now()) },
];

const ok = <T>(val: T) => ({ __kind__: "ok" as const, ok: val });

export const mockBackend: backendInterface = {
  addRoute: async (name, description, distanceKm) =>
    ok({ id: BigInt(mockRoutes.length + 1), name, description, distanceKm, createdAt: BigInt(Date.now()) }),

  addVehicleModel: async (name, vehicleType, specs) =>
    ok({ id: BigInt(mockModels.length + 1), name, vehicleType, specs, createdAt: BigInt(Date.now()) }),

  adminCreateTestRecord: async (vehicleModelId, routeId, riderName, rangeStartKm, rangeStopKm, startSoc, stopSoc, topSpeedKmh, avgSpeedKmh, issues, photoUrls) =>
    ok({ id: BigInt(99), vehicleModelId, vehicleModelName: "EV-101", routeId, routeName: "Urban Loop Alpha", riderName, rangeStartKm, rangeStopKm, startSoc: startSoc ?? undefined, stopSoc: stopSoc ?? undefined, topSpeedKmh, avgSpeedKmh, issues, photoUrls: photoUrls ?? [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal }),

  changePassword: async (_username, _currentPassword, _newPassword) => ok(null),

  createUserByAdmin: async (username, _password, name, role) =>
    ok({ principal: mockPrincipal, username, name, role, createdAt: BigInt(Date.now()) }),

  deleteRoute: async () => ok(true),
  deleteTestRecord: async () => ok(true),
  deleteUser: async () => ok(true),
  deleteUserByUsername: async () => ok(true),
  deleteVehicleModel: async () => ok(true),

  getMyProfile: async () => mockUsers[0],
  getRoute: async (id) => mockRoutes.find(r => r.id === id) ?? null,
  getTestRecord: async (id) => ok(mockTestRecords.find(r => r.id === id) ?? null),
  getTopIssues: async () => ok([
    ["Electrical" as IssueFlag, BigInt(12)],
    ["Mechanical" as IssueFlag, BigInt(8)],
    ["Software" as IssueFlag, BigInt(7)],
    ["Performance" as IssueFlag, BigInt(5)],
    ["Safety" as IssueFlag, BigInt(3)],
  ] as Array<[IssueFlag, bigint]>),
  getUserByUsername: async (username) => mockUsers.find(u => u.username === username) ?? null,
  getUserProfile: async () => mockUsers[0],
  getVehicleModel: async (id) => mockModels.find(m => m.id === id) ?? null,

  listAllUsers: async () => ok(mockUsers),
  listRoutes: async () => mockRoutes,
  listTestRecords: async () => ok(mockTestRecords),
  listTestRecordsByIssue: async (issueFlag) => ok(mockTestRecords.filter(r => r.issues.some(i => i.flag === issueFlag))),
  listTestRecordsByModel: async () => ok(mockTestRecords.slice(0, 2)),
  listTestRecordsByRider: async () => ok(mockTestRecords.slice(0, 2)),
  listTestRecordsByRoute: async () => ok(mockTestRecords.slice(0, 3)),
  listVehicleModels: async () => mockModels,

  loginWithCredentials: async (username, password) => {
    const user = mockUsers.find(u => u.username === username);
    if (user && password === "Admin123") return ok(user);
    return { __kind__: "err" as const, err: "Invalid username or password" };
  },

  registerSelf: async (name) => ok({ principal: mockPrincipal, name, role: "Rider" as UserRole, createdAt: BigInt(Date.now()) }),
  submitTestRecord: async (vehicleModelId, routeId, riderName, rangeStartKm, rangeStopKm, startSoc, stopSoc, topSpeedKmh, avgSpeedKmh, issues, photoUrls) =>
    ok({ id: BigInt(100), vehicleModelId, vehicleModelName: "EV-101", routeId, routeName: "Urban Loop Alpha", riderName, rangeStartKm, rangeStopKm, startSoc: startSoc ?? undefined, stopSoc: stopSoc ?? undefined, topSpeedKmh, avgSpeedKmh, issues, photoUrls: photoUrls ?? [], timestamp: BigInt(Date.now()), createdBy: mockPrincipal }),
  updateUserRole: async () => ok(true),
  updateUserRoleByUsername: async () => ok(true),

  getRiderRating: async (username) =>
    ok({
      username,
      aiScore: 3.8,
      aiScoreTimestamp: BigInt(Date.now()),
      aiScoreFactors: {
        totalKm: 1240.5,
        workingDays: BigInt(48),
        issueCount: BigInt(3),
        behaviorScore: 0.82,
      },
      adminRating: undefined,
      adminRatingComment: undefined,
      adminRatingTimestamp: undefined,
    }),

  setAdminRatingForRider: async (username, rating, comment) =>
    ok({
      username,
      adminRating: rating,
      adminRatingComment: comment ?? undefined,
      adminRatingTimestamp: BigInt(Date.now()),
    }),

  recalculateRiderRating: async (username) =>
    ok({
      username,
      aiScore: 4.1,
      aiScoreTimestamp: BigInt(Date.now()),
      aiScoreFactors: {
        totalKm: 1280.0,
        workingDays: BigInt(50),
        issueCount: BigInt(3),
        behaviorScore: 0.86,
      },
    }),
};
