import { apiDelete, apiGet, apiPost, apiPut } from './api';
import { KhachHang } from '../types/SanPham';

export interface ChiTietCongNo {
  khachHang: KhachHang;
  tongNo: number;
  noQuaHan: number;
  hoaDons: { id: number; ngayBan: string; tongTien: number; soTienDaThanhToan: number; conNo: number; quaHan: boolean; trangThaiTT: string }[];
  lichSuThu: { id: number; ngayThu: string; soTien: number; hinhThucTT: 'tienmat' | 'chuyenkhoan'; ghiChu?: string | null; nguoiThu: { hoTen: string }; phanBos: { hoaDonId: number; soTien: number }[] }[];
}

export const khachHangService = {
  getAll: () => apiGet<KhachHang[]>('/admin/customers'),
  create: (payload: Omit<KhachHang, 'id'>) => apiPost<KhachHang>('/admin/customers', payload),
  update: (id: string, payload: Omit<KhachHang, 'id'>) => apiPut<KhachHang>(`/admin/customers/${id}`, payload),
  remove: (id: string) => apiDelete<void>(`/admin/customers/${id}`),
  getDebt: (id: string) => apiGet<ChiTietCongNo>(`/admin/customers/${id}/cong-no`),
  collectDebt: (id: string, payload: { soTien: number; hinhThucTT: 'tienmat' | 'chuyenkhoan'; ghiChu?: string }) => apiPost<ChiTietCongNo>(`/admin/customers/${id}/thu-no`, payload),
};
