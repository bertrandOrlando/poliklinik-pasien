"use client";

import CardPendaftaran from "@/components/CardPendaftaran";
import { pendaftaranType } from "@/types/PendaftaranType";
import AxiosInstance from "@/utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DaftarPendaftaranPage() {
  const router = useRouter();

  const [janjiTemu, setJanjiTemu] = useState<pendaftaranType[]>([]);

  const [userRole, setUserRole] = useState<string>();
  const [idPasien, setIdPasien] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const today = new Date();
  today.setHours(0, 0, 1, 1);

  useEffect(() => {
    const getRiwayatPendaftaranPasien = async (id: string) => {
      AxiosInstance.get(`/api/pendaftaran/${id}`).then((response) => {
        setJanjiTemu(response.data);
      });
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { idpasien: string; role: string } = jwtDecode(token);

        setUserRole(decoded.role);
        setIdPasien(decoded.idpasien);
        setIsLoggedIn(true);

        getRiwayatPendaftaranPasien(decoded.idpasien);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <section className="container mx-auto p-16">
        <div className="mb-6 border-b border-primaryCol">
          <h2 className="mb-4 text-2xl font-semibold text-primaryCol">
            Daftar Pendaftaran
          </h2>
          <p className="mb-4 text-gray-600">
            Perlihatkan detail pendaftaran kepada petugas saat daftar ulang
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {janjiTemu
            .filter((item) => {
              const tanggalDaftar = new Date(item.tanggal_daftar);
              return tanggalDaftar >= today;
            })
            .map((item, index) => (
              <CardPendaftaran key={index} {...item} />
            ))}
        </div>
      </section>

      <section className="container mx-auto p-16">
        <div className="mb-4 border-b border-primaryCol">
          <h2 className="mb-4 text-2xl font-semibold text-primaryCol">
            Riwayat Kedatangan
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {janjiTemu
            .filter((item) => {
              const tanggalDaftar = new Date(item.tanggal_daftar);
              return tanggalDaftar < today || item.status != "pendaftaran";
            })
            .map((item, index) => (
              <CardPendaftaran key={index} {...item} riwayat={true} />
            ))}
        </div>
      </section>
    </>
  );
}
