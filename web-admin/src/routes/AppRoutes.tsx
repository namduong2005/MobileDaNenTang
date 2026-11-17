import { ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import DangNhap from '../pages/DangNhap';
import SanPhamList from '../pages/SanPham/SanPhamList';
import SanPhamForm from '../pages/SanPham/SanPhamForm';
import NhaCungCapList from '../pages/NhaCungCap/NhaCungCapList';
import KhachHangList from '../pages/KhachHang/KhachHangList';
import PhieuNhapList from '../pages/PhieuNhap/PhieuNhapList';
import PhieuNhapForm from '../pages/PhieuNhap/PhieuNhapForm';
import BaoCaoDoanhThu from '../pages/BaoCao/BaoCaoDoanhThu';
import NguoiDungList from '../pages/NguoiDung/NguoiDungList';
import KiemKeKho from '../pages/KiemKe/KiemKeKho';
import DesignShowcase from '../pages/DesignShowcase';
import Dashboard from '../pages/Dashboard';
import Thue from '../pages/Thue';

function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const { token, nguoiDung } = useAuth();
  const location = useLocation();

  if (!token) return <Navigate to="/dang-nhap" replace state={{ from: location.pathname }} />;
  if (adminOnly && !['admin', 'owner'].includes(nguoiDung?.vaiTro ?? '')) return <Navigate to="/nha-cung-cap" replace />;

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dang-nhap" element={<DangNhap />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
        <Route path="san-pham" element={<ProtectedRoute adminOnly><SanPhamList /></ProtectedRoute>} />
        <Route path="san-pham/them" element={<ProtectedRoute adminOnly><SanPhamForm /></ProtectedRoute>} />
        <Route path="san-pham/:id/sua" element={<ProtectedRoute adminOnly><SanPhamForm /></ProtectedRoute>} />
        <Route path="nha-cung-cap" element={<NhaCungCapList />} />
        <Route path="khach-hang" element={<KhachHangList />} />
        <Route path="phieu-nhap" element={<PhieuNhapList />} />
        <Route path="phieu-nhap/them" element={<PhieuNhapForm />} />
        <Route path="kiem-ke" element={<KiemKeKho />} />
        <Route path="thue" element={<ProtectedRoute adminOnly><Thue /></ProtectedRoute>} />
        <Route path="bao-cao" element={<ProtectedRoute adminOnly><BaoCaoDoanhThu /></ProtectedRoute>} />
        <Route path="nguoi-dung" element={<ProtectedRoute adminOnly><NguoiDungList /></ProtectedRoute>} />
        <Route path="design-showcase" element={<DesignShowcase />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
