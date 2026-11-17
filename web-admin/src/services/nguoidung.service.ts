import { apiDelete, apiGet, apiPost, apiPut } from './api';
import { NguoiDung, VaiTro } from '../types/NguoiDung';

export interface NguoiDungPayload {
  hoTen: string;
  taiKhoan: string;
  matKhau?: string;
  vaiTro: VaiTro;
  trangThai?: boolean;
}

export const nguoiDungService = {
  getAll: () => apiGet<NguoiDung[]>('/admin/employees'),
  create: (payload: NguoiDungPayload) => apiPost<NguoiDung>('/admin/employees', payload),
  update: (id: string, payload: Partial<NguoiDungPayload>) => apiPut<NguoiDung>(`/admin/employees/${id}`, payload),
  remove: (id: string) => apiDelete<void>(`/admin/employees/${id}`),
};
