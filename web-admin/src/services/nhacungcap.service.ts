import { apiDelete, apiGet, apiPost, apiPut } from './api';
import { NhaCungCap } from '../types/SanPham';

export interface ChiTietCongNoNhaCungCap {
  nhaCungCap: NhaCungCap;
  tongNo: number;
  noQuaHan: number;
  phieuNhaps: { id: number; ngayNhap: string; tongTien: number; soTienDaThanhToan: number; conNo: number; quaHan: boolean; trangThaiTT: string }[];
  lichSuTra: { id: number; ngayTra: string; soTien: number; hinhThucTT: 'tienmat' | 'chuyenkhoan'; ghiChu?: string | null; nguoiTra: { hoTen: string }; phanBos: { phieuNhapId: number; soTien: number }[] }[];
}

export const nhaCungCapService = {
  getAll: () => apiGet<NhaCungCap[]>('/admin/suppliers'),
  create: (payload: Omit<NhaCungCap, 'id'>) => apiPost<NhaCungCap>('/admin/suppliers', payload),
  update: (id: string, payload: Omit<NhaCungCap, 'id'>) => apiPut<NhaCungCap>(`/admin/suppliers/${id}`, payload),
  remove: (id: string) => apiDelete<void>(`/admin/suppliers/${id}`),
  getDebt: (id: string) => apiGet<ChiTietCongNoNhaCungCap>(`/admin/suppliers/${id}/cong-no`),
  payDebt: (id: string, payload: { soTien: number; hinhThucTT: 'tienmat' | 'chuyenkhoan'; ghiChu?: string }) => apiPost<ChiTietCongNoNhaCungCap>(`/admin/suppliers/${id}/tra-no`, payload),
};
