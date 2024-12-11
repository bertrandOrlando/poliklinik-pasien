"use client";

import { useDayName } from "@/utils/useDayName";
import { FormEvent, useEffect, useState } from "react";

import AxiosInstance from "@/utils/AxiosInstance";
import { DetailDokterDataType } from "@/types/DetailDokterDataType";
import { useTimeFormatter } from "@/utils/useTimeFormatter";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function DetailDokterPage({
  params,
}: {
  params: { id_dokter: string };
}) {
  const router = useRouter();

  const id_dokter = params.id_dokter.split("-")[0];
  const [dokter, setDokter] = useState<DetailDokterDataType>();
  const [idJanjiTemu, setIdJanjiTemu] = useState<number>();
  const [userRole, setUserRole] = useState<string>();
  const [idPasien, setIdPasien] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = useDayName();
  const tomorrow = dayName.getTomorrowDay();
  const formattedTomorrow = dayName.getFormattedTomorrow();

  const timeFormatter = useTimeFormatter();

  const submitHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (idJanjiTemu) {
      if (!isLoggedIn) {
        router.push("/daftar");
      }

      AxiosInstance.post("/api/pendaftaran/online", {
        id_pasien: idPasien,
        id_jadwal: idJanjiTemu,
      }).then((response) => {
        if (response.status === 200) {
          const id_pendaftaran = response.data["id_pendaftaran"];
          router.push("/pendaftaran/" + id_pendaftaran);
        }
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { idpasien: string; role: string } = jwtDecode(token);
        setUserRole(decoded.role);
        setIdPasien(decoded.idpasien);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    }

    const getDetailDokter = async () => {
      AxiosInstance.get(`/api/jadwal-praktik/${id_dokter}`).then((response) => {
        setDokter(response.data);
      });
    };

    getDetailDokter();
  }, []);
  return (
    <main className="mx-auto mb-[100px] mt-12 max-w-6xl rounded-lg bg-white p-6 shadow-md">
      <section className="mb-8 border-b border-gray-300 pb-6">
        <div className="flex items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {dokter?.nama}
            </h2>
            <p className="text-gray-600">
              Spesialis {dokter?.nama_spesialisasi}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">
            Jadwal Praktik
          </h3>
          <div className="grid grid-cols-3 gap-y-6 text-gray-700">
            {days.map((day, indexDay) => {
              return (
                <div key={indexDay}>
                  <p className="capitalize">{day}</p>
                  {dokter?.jadwal_praktik
                    .filter(
                      (jadwal) =>
                        jadwal.hari.toLowerCase() === day.toLowerCase(),
                    )
                    .map((jadwal, indexJadwal) => {
                      return (
                        <p
                          key={indexJadwal}
                          className={day == tomorrow ? "font-semibold" : ""}
                        >
                          {timeFormatter.formatTime(
                            jadwal.start_time,
                            jadwal.end_time,
                          )}
                        </p>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 border-l border-gray-300 pl-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Buat Janji Temu
          </h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {dokter?.jadwal_praktik
                .filter(
                  (jadwal) =>
                    jadwal.hari.toLowerCase() === tomorrow.toLowerCase(),
                )
                .map((jadwal, indexJadwal) => {
                  return (
                    <button
                      className={`rounded-lg px-4 py-2 ${idJanjiTemu === jadwal.id_jadwal ? "bg-primaryCol text-white" : "bg-gray-200 text-gray-700 hover:bg-primaryCol hover:text-white"}`}
                      value={jadwal.id_jadwal}
                      onClick={() => {
                        setIdJanjiTemu(jadwal.id_jadwal);
                      }}
                      key={indexJadwal}
                    >
                      {timeFormatter.formatTime(
                        jadwal.start_time,
                        jadwal.end_time,
                      )}
                    </button>
                  );
                })}
            </div>

            <p className="text-gray-700">
              Anda akan membuat jadwal untuk{" "}
              <span className="font-medium">{formattedTomorrow}</span> pada jam{" "}
              <span className="font-medium">
                {dokter?.jadwal_praktik
                  .filter((jadwal) => jadwal.id_jadwal === idJanjiTemu)
                  .map((jadwal) =>
                    timeFormatter.formatTime(
                      jadwal.start_time,
                      jadwal.end_time,
                    ),
                  )}
              </span>
            </p>

            <button
              type="submit"
              className={`w-full rounded-lg px-4 py-2 ${idJanjiTemu ? "bg-primaryCol text-white hover:bg-secondaryCol" : "bg-tertiaryCol"}`}
              disabled={!idJanjiTemu}
              onClick={submitHandler}
            >
              Buat Janji Temu
            </button>
            {!idJanjiTemu && (
              <p className="text-sm text-red-600">
                * Pilih salah satu jadwal yang tersedia
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
