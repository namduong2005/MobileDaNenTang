import { apiGet } from './api';
import { DoanhThuBaoCao, SanPhamBanChay } from '../types/HoaDon';

const rangeQuery = (tu: string, den: string) => `?tu=${encodeURIComponent(tu)}&den=${encodeURIComponent(den)}`;

export const baoCaoService = {
  doanhThu: (tu: string, den: string) => apiGet<DoanhThuBaoCao>(`/admin/reports/doanhthu${rangeQuery(tu, den)}`),
  banChay: (tu: string, den: string) => apiGet<SanPhamBanChay[]>(`/admin/reports/banchay${rangeQuery(tu, den)}`),
};
