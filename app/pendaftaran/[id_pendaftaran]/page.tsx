"use client";

import { useDayName } from "@/utils/useDayName";
import { useEffect, useState } from "react";

import AxiosInstance from "@/utils/AxiosInstance";
import { useTimeFormatter } from "@/utils/useTimeFormatter";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Placeholder from "@/public/placeholder-profile.png";
import { pendaftaranType } from "@/types/PendaftaranType";
import { useDateFormatter } from "@/utils/useDateFormatter";
import QRCode from "react-qr-code";
export default function DetailPendaftaranPage({
  params,
}: {
  params: { id_pendaftaran: string };
}) {
  const id_pendaftaran = params.id_pendaftaran;

  const router = useRouter();

  const [pendaftaran, setPendaftaran] = useState<pendaftaranType>();
  const [userRole, setUserRole] = useState<string>();
  const [idPasien, setIdPasien] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = useDayName();
  const tomorrow = dayName.getTomorrowDay();
  const formattedTomorrow = dayName.getFormattedTomorrow();

  const timeFormatter = useTimeFormatter();
  const dateFormatter = useDateFormatter();

  useEffect(() => {
    const getDetailPendaftaran = async (id_pasien: string) => {
      AxiosInstance.get(
        `/api/pendaftaran/${id_pasien}?id_pendaftaran=${id_pendaftaran}`,
      ).then((response) => {
        setPendaftaran(response.data[0]);
      });
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { id_pasien: string; role: string } = jwtDecode(token);
        setUserRole(decoded.role);
        setIdPasien(decoded.id_pasien);
        setIsLoggedIn(true);

        getDetailPendaftaran(decoded.id_pasien);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    } else {
      router.push("/masuk");
    }
  }, []);

  return (
    <main className="container mx-auto px-20 py-6">
      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
        <button
          onClick={() => {
            router.back();
          }}
          className="text-[#757575] hover:underline"
        >
          &larr; Kembali
        </button>
        {pendaftaran && (
          <span className="text-[#757575]">
            ID Pendaftaran: {pendaftaran.id_pendaftaran}
          </span>
        )}
      </div>

      {pendaftaran && (
        <section className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Pendaftaran Janji Temu Anda Berhasil,
            </h3>
            <p className="text-gray-600">
              Perlihatkan halaman ini kepada petugas saat akan melakukan daftar
              ulang dan hadir tepat waktu.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={Placeholder}
              alt="Doctor Image"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-800">
                {pendaftaran.nama_dokter}
              </h2>
              <p className="text-gray-600">
                Spesialis {pendaftaran.nama_spesialisasi}
              </p>
            </div>
          </div>
          <div className="ml-6">
            <ul className="list-disc">
              <li className="capitalize text-gray-600">
                Tanggal:{" "}
                <span className="font-semibold text-gray-800">
                  {pendaftaran.hari},{" "}
                  {dateFormatter.formatDate(pendaftaran.tanggal_daftar)}
                </span>
              </li>
              <li className="capitalize text-gray-600">
                Waktu:{" "}
                <span className="font-semibold text-gray-800">
                  {timeFormatter.formatTime(
                    pendaftaran.start_time,
                    pendaftaran.end_time,
                  )}
                </span>
              </li>
            </ul>
          </div>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "150px", width: "150px" }}
            value={`http://localhost:3001/daftar-ulang/qr/${id_pendaftaran}`}
            viewBox={`0 0 256 256`}
          />

          <p>Terima kasih atas kepercayaan Anda. Kami tunggu kehadirannya!</p>
        </section>
      )}
    </main>
  );
}
