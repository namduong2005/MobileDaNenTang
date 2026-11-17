import { apiGet } from './api';

export interface CauHinhThue { id: number; ten: string; loaiThue: string; phuongPhapTinh: string; nguongDoanhThu: number; tyLe: number; hieuLucTu: string; hieuLucDen?: string | null; trangThai: boolean; ghiChu?: string | null; }
export interface TongQuanThue { tu: string; den: string; doanhThu: number; soHoaDon: number; cauHinhApDung: CauHinhThue | null; doanhThuTinhThue: number; thuePhaiNop: number; thongBao: string; cauHinhs: CauHinhThue[]; }
export const thueService = { overview: (tu: string, den: string) => apiGet<TongQuanThue>(`/admin/taxes/overview?tu=${tu}&den=${den}`) };
