import { Skeleton } from "@/components/ui/skeleton";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  Navigate,
  Outlet,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { UserRole } from "./backend";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

// Lazy pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminModels = lazy(() => import("./pages/AdminModels"));
const AdminRoutes = lazy(() => import("./pages/AdminRoutes"));
const AdminEntry = lazy(() => import("./pages/AdminEntry"));
const AdminReports = lazy(() => import("./pages/AdminReports"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminImport = lazy(() => import("./pages/AdminImport"));
const AdminRiderProfile = lazy(() => import("./pages/AdminRiderProfile"));
const RiderDashboard = lazy(() => import("./pages/RiderDashboard"));
const RiderRecords = lazy(() => import("./pages/RiderRecords"));
const RiderProfile = lazy(() => import("./pages/RiderProfile"));
const AnalystDashboard = lazy(() => import("./pages/AnalystDashboard"));
const AnalystReports = lazy(() => import("./pages/AnalystReports"));

const LOADER_ITEMS = ["a", "b", "c", "d", "e", "f"];

const PageLoader = () => (
  <div className="p-6 space-y-4">
    <Skeleton className="h-8 w-64" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {LOADER_ITEMS.map((k) => (
        <Skeleton key={k} className="h-32 rounded-lg" />
      ))}
    </div>
  </div>
);

const withLayout = (children: React.ReactNode, roles?: UserRole[]) => (
  <ProtectedRoute allowedRoles={roles}>
    <Layout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </Layout>
  </ProtectedRoute>
);

// Routes
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" search={{ setup: false }} />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  validateSearch: (search: Record<string, unknown>) => ({
    setup: search.setup === true || search.setup === "true",
  }),
  component: function LoginRoute() {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    );
  },
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => withLayout(<AdminDashboard />, [UserRole.Admin]),
});

const adminModelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/models",
  component: () => withLayout(<AdminModels />, [UserRole.Admin]),
});

const adminRoutesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/routes",
  component: () => withLayout(<AdminRoutes />, [UserRole.Admin]),
});

const adminEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/entry",
  component: () => withLayout(<AdminEntry />, [UserRole.Admin]),
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  component: () => withLayout(<AdminReports />, [UserRole.Admin]),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => withLayout(<AdminUsers />, [UserRole.Admin]),
});

const adminImportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/import",
  component: () => withLayout(<AdminImport />, [UserRole.Admin]),
});

const adminRiderProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/riders/$username",
  component: () => withLayout(<AdminRiderProfile />, [UserRole.Admin]),
});

const riderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rider",
  component: () => withLayout(<RiderDashboard />, [UserRole.Rider]),
});

const riderRecordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rider/records",
  component: () => withLayout(<RiderRecords />, [UserRole.Rider]),
});

const riderProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rider/profile",
  component: () => withLayout(<RiderProfile />, [UserRole.Rider]),
});

const analystRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analyst",
  component: () => withLayout(<AnalystDashboard />, [UserRole.Analyst]),
});

const analystReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analyst/reports",
  component: () => withLayout(<AnalystReports />, [UserRole.Analyst]),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  adminRoute,
  adminModelsRoute,
  adminRoutesRoute,
  adminEntryRoute,
  adminReportsRoute,
  adminUsersRoute,
  adminImportRoute,
  adminRiderProfileRoute,
  riderRoute,
  riderRecordsRoute,
  riderProfileRoute,
  analystRoute,
  analystReportsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
