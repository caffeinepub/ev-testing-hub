import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Issue,
  RiderRating,
  Route,
  TestPurpose,
  TestRecord,
  TestingMode,
  UserProfile,
  VehicleModel,
} from "../backend";
import { IssueFlag, UserRole, VehicleType } from "../backend";
import type { ModelId, RecordId, RouteId } from "../backend";

function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}

// ─── Test Records ───────────────────────────────────────────────────────────

export function useTestRecords() {
  const { actor, ready } = useActorReady();
  return useQuery<TestRecord[]>({
    queryKey: ["testRecords"],
    queryFn: async (): Promise<TestRecord[]> => {
      if (!actor) return [];
      const res = await actor.listTestRecords();
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: ready,
  });
}

export function useTestRecord(id: RecordId) {
  const { actor, ready } = useActorReady();
  return useQuery<TestRecord | null>({
    queryKey: ["testRecord", id.toString()],
    queryFn: async (): Promise<TestRecord | null> => {
      if (!actor) return null;
      const res = await actor.getTestRecord(id);
      if (res.__kind__ === "ok") return res.ok;
      return null;
    },
    enabled: ready,
  });
}

export function useAddTestRecord() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      vehicleModelId: ModelId;
      routeId: RouteId;
      riderName: string;
      rangeStartKm: number;
      rangeStopKm: number;
      startSoc: number | null;
      stopSoc: number | null;
      topSpeedKmh: number;
      avgSpeedKmh: number;
      issues: Issue[];
      photoUrls?: string[];
      testingMode?: TestingMode | null;
      customRoute?: string | null;
      riderWeight?: number | null;
      coRiderWeight?: number | null;
      testPurpose?: TestPurpose | null;
      dateOfRide?: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.submitTestRecord(
        params.vehicleModelId,
        params.routeId,
        params.riderName,
        params.rangeStartKm,
        params.rangeStopKm,
        params.startSoc,
        params.stopSoc,
        params.topSpeedKmh,
        params.avgSpeedKmh,
        params.issues,
        params.photoUrls ?? null,
        params.testingMode ?? null,
        params.customRoute ?? null,
        params.riderWeight ?? null,
        params.coRiderWeight ?? null,
        params.testPurpose ?? null,
        params.dateOfRide != null ? BigInt(params.dateOfRide) : null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testRecords"] });
      qc.invalidateQueries({ queryKey: ["topIssues"] });
    },
  });
}

export function useAdminCreateTestRecord() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      vehicleModelId: ModelId;
      routeId: RouteId;
      riderName: string;
      rangeStartKm: number;
      rangeStopKm: number;
      startSoc: number | null;
      stopSoc: number | null;
      topSpeedKmh: number;
      avgSpeedKmh: number;
      issues: Issue[];
      photoUrls?: string[];
      testingMode?: TestingMode | null;
      customRoute?: string | null;
      riderWeight?: number | null;
      coRiderWeight?: number | null;
      testPurpose?: TestPurpose | null;
      dateOfRide?: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.adminCreateTestRecord(
        params.vehicleModelId,
        params.routeId,
        params.riderName,
        params.rangeStartKm,
        params.rangeStopKm,
        params.startSoc,
        params.stopSoc,
        params.topSpeedKmh,
        params.avgSpeedKmh,
        params.issues,
        params.photoUrls ?? null,
        params.testingMode ?? null,
        params.customRoute ?? null,
        params.riderWeight ?? null,
        params.coRiderWeight ?? null,
        params.testPurpose ?? null,
        params.dateOfRide != null ? BigInt(params.dateOfRide) : null,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testRecords"] });
      qc.invalidateQueries({ queryKey: ["topIssues"] });
    },
  });
}

export function useDeleteTestRecord() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: RecordId) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.deleteTestRecord(id);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testRecords"] });
      qc.invalidateQueries({ queryKey: ["topIssues"] });
    },
  });
}

// ─── Vehicle Models ──────────────────────────────────────────────────────────

export function useVehicleModels() {
  const { actor, ready } = useActorReady();
  return useQuery<VehicleModel[]>({
    queryKey: ["vehicleModels"],
    queryFn: async (): Promise<VehicleModel[]> => {
      if (!actor) return [];
      return actor.listVehicleModels();
    },
    enabled: ready,
  });
}

export function useAddVehicleModel() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      vehicleType: VehicleType;
      specs: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.addVehicleModel(
        params.name,
        params.vehicleType,
        params.specs,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicleModels"] }),
  });
}

export function useDeleteVehicleModel() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ModelId) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.deleteVehicleModel(id);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicleModels"] }),
  });
}

// ─── Routes ──────────────────────────────────────────────────────────────────

export function useRoutes() {
  const { actor, ready } = useActorReady();
  return useQuery<Route[]>({
    queryKey: ["routes"],
    queryFn: async (): Promise<Route[]> => {
      if (!actor) return [];
      return actor.listRoutes();
    },
    enabled: ready,
  });
}

export function useAddRoute() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      description: string;
      distanceKm: number;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.addRoute(
        params.name,
        params.description,
        params.distanceKm,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["routes"] }),
  });
}

export function useDeleteRoute() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: RouteId) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.deleteRoute(id);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["routes"] }),
  });
}

// ─── Users ───────────────────────────────────────────────────────────────────

export function useUsers() {
  const { actor, ready } = useActorReady();
  return useQuery<UserProfile[]>({
    queryKey: ["users"],
    queryFn: async (): Promise<UserProfile[]> => {
      if (!actor) return [];
      const res = await actor.listAllUsers();
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: ready,
  });
}

export function useUpdateUserRole() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { principal: Principal; newRole: UserRole }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.updateUserRole(params.principal, params.newRole);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.deleteUser(principal);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useCreateUserByAdmin() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      username: string;
      password: string;
      name: string;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.createUserByAdmin(
        params.username,
        params.password,
        params.name,
        params.role,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUserByUsername() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.deleteUserByUsername(username);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUserRoleByUsername() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { username: string; newRole: UserRole }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.updateUserRoleByUsername(
        params.username,
        params.newRole,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ─── Top Issues ───────────────────────────────────────────────────────────────

export function useTopIssues(limit = 5) {
  const { actor, ready } = useActorReady();
  return useQuery<Array<[IssueFlag, bigint]>>({
    queryKey: ["topIssues", limit],
    queryFn: async (): Promise<Array<[IssueFlag, bigint]>> => {
      if (!actor) return [];
      const res = await actor.getTopIssues(BigInt(limit));
      if (res.__kind__ === "ok") return res.ok;
      return [];
    },
    enabled: ready,
  });
}

// ─── Change Password ──────────────────────────────────────────────────────────

export function useChangePassword() {
  const { actor } = useActorReady();
  return useMutation({
    mutationFn: async (params: {
      username: string;
      currentPassword: string;
      newPassword: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.changePassword(
        params.username,
        params.currentPassword,
        params.newPassword,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
  });
}

// ─── Rider Rating ─────────────────────────────────────────────────────────────

export function useGetRiderRating(username: string) {
  const { actor, ready } = useActorReady();
  return useQuery<RiderRating | null>({
    queryKey: ["riderRating", username],
    queryFn: async (): Promise<RiderRating | null> => {
      if (!actor || !username) return null;
      const res = await actor.getRiderRating(username);
      if (res.__kind__ === "ok") return res.ok;
      return null;
    },
    enabled: ready && !!username,
  });
}

export function useSetAdminRating() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      username: string;
      rating: number;
      comment: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.setAdminRatingForRider(
        params.username,
        BigInt(params.rating),
        params.comment,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["riderRating", variables.username] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useRecalculateRating() {
  const { actor } = useActorReady();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Actor not ready");
      const res = await actor.recalculateRiderRating(username);
      if (res.__kind__ === "err") throw new Error(res.err);
      return res.ok;
    },
    onSuccess: (_data, username) => {
      qc.invalidateQueries({ queryKey: ["riderRating", username] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Re-export enums and types for convenience
export { IssueFlag, UserRole, VehicleType };
export type { RiderRating, TestingMode, TestPurpose };
