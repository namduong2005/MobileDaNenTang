import { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { Column } from '../../components/table/DataTable';
import { useFetch } from '../../hooks/useFetch';
import { phieuNhapService } from '../../services/phieunhap.service';
import { PhieuNhap } from '../../types/SanPham';

const statusLabel: Record<string, string> = { DRAFT: 'Nháp', CONFIRMED: 'Đã xác nhận', CANCELLED: 'Đã hủy' };

export default function PhieuNhapList() {
  const { data, loading, error, refetch } = useFetch(phieuNhapService.getAll);
  const [actionError, setActionError] = useState('');
  const [workingId, setWorkingId] = useState<string | null>(null);
  const action = async (row: PhieuNhap, type: 'confirm' | 'cancel') => {
    const message = type === 'confirm' ? `Xác nhận phiếu nhập #${row.id}? Tồn kho sẽ được cộng và không thể sửa phiếu.` : `Hủy phiếu nhập #${row.id}?`;
    if (!window.confirm(message)) return;
    setWorkingId(row.id); setActionError('');
    try { await phieuNhapService[type](row.id); await refetch(); }
    catch (e: any) { setActionError(e?.response?.data?.message ?? 'Không thể xử lý phiếu nhập.'); }
    finally { setWorkingId(null); }
  };
  const columns: Column<PhieuNhap>[] = [
    { key: 'id', title: 'Mã phiếu', render: (row) => `#${row.id}` },
    { key: 'ngayNhap', title: 'Ngày nhập', render: (row) => new Date(row.ngayNhap).toLocaleString('vi-VN') },
    { key: 'nhaCungCap', title: 'Nhà cung cấp', render: (row) => row.nhaCungCap?.ten ?? row.nhaCungCapId },
    { key: 'tongTien', title: 'Tổng tiền', render: (row) => `${Number(row.tongTien).toLocaleString('vi-VN')}đ` },
    { key: 'payment', title: 'Thanh toán', render: (row) => { const paid = Number(row.soTienDaThanhToan || 0); const due = Math.max(0, Number(row.tongTien) - paid); return row.trangThai === 'CANCELLED' ? '—' : due > 0 ? <span className="status danger">Còn nợ {due.toLocaleString('vi-VN')}đ</span> : <span className="status success">Đã trả đủ</span>; } },
    { key: 'trangThai', title: 'Trạng thái', render: (row) => <span className="badge-tag">{statusLabel[row.trangThai ?? 'DRAFT']}</span> },
    { key: 'action', title: 'Thao tác', render: (row) => row.trangThai === 'DRAFT' || !row.trangThai ? <div className="table-actions"><button className="btn primary small" disabled={workingId === row.id} onClick={() => void action(row, 'confirm')}>Xác nhận</button><button className="btn danger small" disabled={workingId === row.id} onClick={() => void action(row, 'cancel')}>Hủy</button></div> : 'Đã khóa' },
  ];
  return <section className="page"><div className="page-head"><div><h2>Phiếu nhập</h2><p>Tạo nháp, kiểm tra và xác nhận trước khi tồn kho được cập nhật.</p></div><Link className="btn primary" to="/phieu-nhap/them">Tạo phiếu nhập</Link></div>{(error || actionError) && <div className="alert danger">{actionError || error}</div>}<DataTable columns={columns} data={data ?? []} loading={loading} rowKey={(row) => row.id} /></section>;
}
