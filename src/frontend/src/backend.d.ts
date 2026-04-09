import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RiderRating {
    adminRating?: bigint;
    username: string;
    adminRatingComment?: string;
    aiScoreTimestamp?: Timestamp;
    aiScore?: number;
    aiScoreFactors?: AiScoreFactors;
    adminRatingTimestamp?: Timestamp;
}
export type Timestamp = bigint;
export type ModelId = bigint;
export type TestPurpose = {
    __kind__: "ComponentTest";
    ComponentTest: null;
} | {
    __kind__: "Range";
    Range: null;
} | {
    __kind__: "Durability";
    Durability: null;
} | {
    __kind__: "Others";
    Others: string;
};
export interface TestRecord {
    id: RecordId;
    photoUrls: Array<string>;
    rangeStartKm: number;
    vehicleModelName: string;
    startSoc?: number;
    stopSoc?: number;
    createdBy: Principal;
    coRiderWeight?: number;
    vehicleModelId: ModelId;
    routeName: string;
    testingMode?: TestingMode;
    issues: Array<Issue>;
    customRoute?: string;
    routeId: RouteId;
    rangeStopKm: number;
    topSpeedKmh: number;
    testPurpose?: TestPurpose;
    timestamp: Timestamp;
    riderName: string;
    avgSpeedKmh: number;
    dateOfRide?: Timestamp;
    riderWeight?: number;
}
export type RouteId = bigint;
export interface VehicleModel {
    id: ModelId;
    vehicleType: VehicleType;
    name: string;
    createdAt: Timestamp;
    specs: string;
}
export interface Issue {
    flag: IssueFlag;
    description: string;
}
export type RecordId = bigint;
export interface AiScoreFactors {
    behaviorScore: number;
    totalKm: number;
    issueCount: bigint;
    workingDays: bigint;
}
export type TestingMode = {
    __kind__: "Eco";
    Eco: null;
} | {
    __kind__: "Sport";
    Sport: null;
} | {
    __kind__: "City";
    City: null;
} | {
    __kind__: "Other";
    Other: string;
};
export interface UserProfile {
    adminRating?: bigint;
    principal: Principal;
    username?: string;
    adminRatingComment?: string;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    passwordHash?: string;
    aiScoreTimestamp?: Timestamp;
    aiScore?: number;
    aiScoreFactors?: AiScoreFactors;
    adminRatingTimestamp?: Timestamp;
}
export interface Route {
    id: RouteId;
    name: string;
    createdAt: Timestamp;
    description: string;
    distanceKm: number;
}
export enum IssueFlag {
    Safety = "Safety",
    Software = "Software",
    Mechanical = "Mechanical",
    Performance = "Performance",
    Electrical = "Electrical",
    Other = "Other"
}
export enum UserRole {
    Rider = "Rider",
    Analyst = "Analyst",
    Admin = "Admin"
}
export enum VehicleType {
    TwoWheeler = "TwoWheeler",
    ThreeWheeler = "ThreeWheeler"
}
export interface backendInterface {
    addRoute(name: string, description: string, distanceKm: number): Promise<{
        __kind__: "ok";
        ok: Route;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addVehicleModel(name: string, vehicleType: VehicleType, specs: string): Promise<{
        __kind__: "ok";
        ok: VehicleModel;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateTestRecord(vehicleModelId: ModelId, routeId: RouteId, riderName: string, rangeStartKm: number, rangeStopKm: number, startSoc: number | null, stopSoc: number | null, topSpeedKmh: number, avgSpeedKmh: number, issues: Array<Issue>, photoUrls: Array<string> | null, testingMode: TestingMode | null, customRoute: string | null, riderWeight: number | null, coRiderWeight: number | null, testPurpose: TestPurpose | null, dateOfRide: bigint | null): Promise<{
        __kind__: "ok";
        ok: TestRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    changePassword(username: string, currentPassword: string, newPassword: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createUserByAdmin(username: string, password: string, name: string, role: UserRole): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteRoute(id: RouteId): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteTestRecord(id: RecordId): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteUser(principal: Principal): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteUserByUsername(username: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteVehicleModel(id: ModelId): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyProfile(): Promise<UserProfile | null>;
    getRiderRating(username: string): Promise<{
        __kind__: "ok";
        ok: RiderRating | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRoute(id: RouteId): Promise<Route | null>;
    getTestRecord(id: RecordId): Promise<{
        __kind__: "ok";
        ok: TestRecord | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getTopIssues(limit: bigint): Promise<{
        __kind__: "ok";
        ok: Array<[IssueFlag, bigint]>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUserByUsername(username: string): Promise<UserProfile | null>;
    getUserProfile(principal: Principal): Promise<UserProfile | null>;
    getVehicleModel(id: ModelId): Promise<VehicleModel | null>;
    listAllUsers(): Promise<{
        __kind__: "ok";
        ok: Array<UserProfile>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listRoutes(): Promise<Array<Route>>;
    listTestRecords(): Promise<{
        __kind__: "ok";
        ok: Array<TestRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listTestRecordsByIssue(issueFlag: IssueFlag): Promise<{
        __kind__: "ok";
        ok: Array<TestRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listTestRecordsByModel(modelId: ModelId): Promise<{
        __kind__: "ok";
        ok: Array<TestRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listTestRecordsByRider(riderName: string): Promise<{
        __kind__: "ok";
        ok: Array<TestRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listTestRecordsByRoute(routeId: RouteId): Promise<{
        __kind__: "ok";
        ok: Array<TestRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listVehicleModels(): Promise<Array<VehicleModel>>;
    loginWithCredentials(username: string, password: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recalculateRiderRating(username: string): Promise<{
        __kind__: "ok";
        ok: RiderRating;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerSelf(name: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAdminRatingForRider(username: string, rating: bigint, comment: string | null): Promise<{
        __kind__: "ok";
        ok: RiderRating;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitTestRecord(vehicleModelId: ModelId, routeId: RouteId, riderName: string, rangeStartKm: number, rangeStopKm: number, startSoc: number | null, stopSoc: number | null, topSpeedKmh: number, avgSpeedKmh: number, issues: Array<Issue>, photoUrls: Array<string> | null, testingMode: TestingMode | null, customRoute: string | null, riderWeight: number | null, coRiderWeight: number | null, testPurpose: TestPurpose | null, dateOfRide: bigint | null): Promise<{
        __kind__: "ok";
        ok: TestRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateUserRole(principal: Principal, newRole: UserRole): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateUserRoleByUsername(username: string, newRole: UserRole): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
