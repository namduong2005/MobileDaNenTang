import { apiGet, apiPost } from './api';
import { PhieuNhap, PhieuNhapChiTiet } from '../types/SanPham';

export interface TaoPhieuNhapPayload {
  nhaCungCapId: string;
  ghiChu?: string;
  hinhThucTT: 'tienmat' | 'chuyenkhoan' | 'congno';
  soTienDaThanhToan?: number;
  chiTiet: PhieuNhapChiTiet[];
}

export const phieuNhapService = {
  getAll: () => apiGet<PhieuNhap[]>('/admin/purchase-receipts'),
  create: (payload: TaoPhieuNhapPayload) => apiPost<PhieuNhap>('/admin/purchase-receipts', payload),
  confirm: (id: string) => apiPost<PhieuNhap>(`/admin/purchase-receipts/${id}/confirm`, {}),
  cancel: (id: string) => apiPost<PhieuNhap>(`/admin/purchase-receipts/${id}/cancel`, {}),
};
