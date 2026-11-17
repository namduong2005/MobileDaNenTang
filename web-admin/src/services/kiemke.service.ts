import { apiGet, apiPost, apiPut } from './api';
import { KiemKeNguon, PhieuKiemKe } from '../types/SanPham';

export interface TaoChiTietKiemKePayload {
  bienTheId: number | string;
  soLuongThucTe: number;
  nguyenNhanChenhLech?: string;
}

export interface TaoKiemKePayload {
  ghiChu?: string;
  chiTiet: TaoChiTietKiemKePayload[];
}

export const kiemKeService = {
  getSource: () => apiGet<KiemKeNguon[]>('/admin/stocktakes/nguon'),
  getAll: (trangThai?: string) => apiGet<PhieuKiemKe[]>(`/admin/stocktakes${trangThai ? `?trangThai=${trangThai}` : ''}`),
  getById: (id: string | number) => apiGet<PhieuKiemKe>(`/admin/stocktakes/${id}`),
  create: (payload: TaoKiemKePayload) => apiPost<PhieuKiemKe>('/admin/stocktakes', payload),
  approve: (id: string | number) => apiPut<PhieuKiemKe>(`/admin/stocktakes/${id}/duyet`, {}),
  reject: (id: string | number, lyDoTuChoi: string) => apiPut<PhieuKiemKe>(`/admin/stocktakes/${id}/tu-choi`, { lyDoTuChoi }),
};
