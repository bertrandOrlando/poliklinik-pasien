import { JadwalPraktikType } from "./JadwalPraktikType";

export type DetailDokterDataType = {
  id_pegawai: number;
  nama: string;
  nama_spesialisasi: string;
  biaya_kunjungan: number;
  jadwal_praktik: JadwalPraktikType[];
};
