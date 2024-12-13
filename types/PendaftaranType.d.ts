type StatusType =
  | "pendaftaran"
  | "pemanggilan"
  | "dokter"
  | "pemeriksaan"
  | "tuntas";

export type pendaftaranType = {
  id_pendaftaran: number;
  status: StatusType;
  antrian: number;
  tanggal_daftar: string;
  id_pasien: number;
  id_jadwal: number;
  hari: string;
  start_time: string;
  end_time: string;
  kuota: number;
  no_ruang: string;
  id_transaksi: number;
  metode: string;
  nama_dokter: string;
  nama_spesialisasi: string;
  biaya_total: number;
};
