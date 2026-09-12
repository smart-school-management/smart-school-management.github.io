import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));
const Buy = React.lazy(() => import('@/pages/Buy'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const DashboardLayout = React.lazy(() => import('@/pages/dashboard/DashboardLayout'));
const DashboardHome = React.lazy(() => import('@/pages/dashboard/DashboardHome'));
const LicensePage = React.lazy(() => import('@/pages/dashboard/LicensePage'));
const ProfileSettings = React.lazy(() => import('@/pages/dashboard/ProfileSettings'));
const OrdersHistory = React.lazy(() => import('@/pages/dashboard/OrdersHistory'));

const AdminLayout = React.lazy(() => import('@/pages/admin/AdminLayout'));
const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('@/pages/admin/AdminUsers'));
const AdminLicenses = React.lazy(() => import('@/pages/admin/AdminLicenses'));
const AdminPackages = React.lazy(() => import('@/pages/admin/AdminPackages'));
const AdminOrders = React.lazy(() => import('@/pages/admin/AdminOrders'));
const AdminSettings = React.lazy(() => import('@/pages/admin/AdminSettings'));

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  if (isLoading) return <LoadingSpinner fullScreen text="যাচাই করা হচ্ছে..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  if (isLoading) return <LoadingSpinner fullScreen text="যাচাই করা হচ্ছে..." />;
  if (isAuthenticated) return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="লোড হচ্ছে..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/:packageSlug" element={<Buy />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="license" element={<LicensePage />} />
          <Route path="orders" element={<OrdersHistory />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="licenses" element={<AdminLicenses />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
