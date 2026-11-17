/* Cho phép nhiều lô kiểm kê không gắn với chi tiết phiếu nhập và bù dữ liệu lô cũ.
   Script có thể chạy lại an toàn trên SQL Server. */
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
SET XACT_ABORT ON;
BEGIN TRANSACTION;

IF EXISTS (
  SELECT 1 FROM sys.key_constraints
  WHERE parent_object_id = OBJECT_ID(N'dbo.LoHang')
    AND name = N'LoHang_chiTietPhieuNhapId_key'
)
  ALTER TABLE dbo.LoHang DROP CONSTRAINT LoHang_chiTietPhieuNhapId_key;

IF NOT EXISTS (
  SELECT 1 FROM sys.indexes
  WHERE object_id = OBJECT_ID(N'dbo.LoHang')
    AND name = N'UX_LoHang_ChiTietPhieuNhap'
)
  CREATE UNIQUE INDEX UX_LoHang_ChiTietPhieuNhap
    ON dbo.LoHang(chiTietPhieuNhapId)
    WHERE chiTietPhieuNhapId IS NOT NULL;

;WITH TonTheoLo AS (
  SELECT bienTheId, SUM(soLuongCon) AS tongSoLuongCon
  FROM dbo.LoHang
  WHERE soLuongCon > 0
  GROUP BY bienTheId
)
INSERT INTO dbo.LoHang (
  bienTheId, chiTietPhieuNhapId, maLo, ngayNhap,
  soLuongNhap, soLuongCon, giaNhap, trangThai
)
SELECT
  bt.id, NULL, CONCAT(N'TỒN-BÙ-', bt.id), GETDATE(),
  bt.soLuongTon - ISNULL(tl.tongSoLuongCon, 0),
  bt.soLuongTon - ISNULL(tl.tongSoLuongCon, 0),
  bt.giaNhap, 'DANG_BAN'
FROM dbo.BienThe bt
LEFT JOIN TonTheoLo tl ON tl.bienTheId = bt.id
WHERE bt.soLuongTon > ISNULL(tl.tongSoLuongCon, 0);

COMMIT TRANSACTION;
