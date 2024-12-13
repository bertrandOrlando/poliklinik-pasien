import Image from "next/image";
import Placeholder from "@/public/placeholder-profile.png";
import Link from "next/link";
import { pendaftaranType } from "@/types/PendaftaranType";
import { useDateFormatter } from "@/utils/useDateFormatter";
import { useTimeFormatter } from "@/utils/useTimeFormatter";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";

type CardPendaftaranProps = {
  riwayat?: boolean;
} & pendaftaranType;

export default function CardPendaftaran(props: CardPendaftaranProps) {
  const dateFormatter = useDateFormatter();
  const timeFormatter = useTimeFormatter();
  const currencyFormatter = useCurrencyFormatter();

  const statusPendaftaran = {
    pendaftaran: "Menunggu Daftar Ulang",
    pemanggilan: "Menunggu Pemanggilan Perawat",
    dokter: "Menunggu Pemanggilan Dokter",
    pemeriksaan: "Pemeriksaan Dokter",
    tuntas: "Rawat Jalan Selesai",
  };

  return (
    <>
      <div className="rounded-lg bg-white p-10 shadow-md">
        <div className="flex items-center border-b border-gray-300 pb-6">
          <Image
            src={Placeholder}
            alt="Doctor Picture"
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-4">
            <h3 className="font-semibold text-gray-800">{props.nama_dokter}</h3>
            <p className="text-sm text-gray-600">
              Spesialis {props.nama_spesialisasi}
            </p>
          </div>
        </div>
        <div className="font-semibold capitalize text-gray-600">
          Id Pendaftaran : {props.id_pendaftaran}
        </div>
        <div className="mt-4">
          <p className="capitalize text-gray-600">
            Jadwal kedatangan: {props.hari},{" "}
            {dateFormatter.formatDate(props.tanggal_daftar)}
          </p>
          <p className="capitalize text-gray-600">
            Jam: {timeFormatter.formatTime(props.start_time, props.end_time)}
          </p>
          <p className="capitalize text-gray-600">
            Status: {statusPendaftaran[props.status]}
          </p>
          {props.riwayat && props.id_transaksi && (
            <p className="capitalize text-gray-600">
              Total Pembayaran :{" "}
              {currencyFormatter.formatRupiah(props.biaya_total)} (
              {props.metode})
            </p>
          )}
        </div>
        {!props.riwayat && (
          <div className="mt-4 flex items-center justify-end">
            <Link
              href={`/pendaftaran/${props.id_pendaftaran}`}
              className="font-medium text-[#1e1e1e] transition hover:underline"
            >
              Lihat Detail →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
