// Re-export backend types for convenience
export type {
  TestRecord,
  VehicleModel,
  Route,
  UserProfile,
  Issue,
  RiderRating,
  AiScoreFactors,
  RecordId,
  ModelId,
  RouteId,
  Timestamp,
} from "../backend";

export { IssueFlag, UserRole, VehicleType } from "../backend";

// UI-only types
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface TopIssue {
  flag: string;
  count: number;
  vehicleId: string;
  description: string;
  timestamp: string;
}

export interface AuthContextType {
  profile: import("../backend").UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  registerWithRole: (
    name: string,
    role: import("../backend").UserRole,
  ) => Promise<void>;
}
