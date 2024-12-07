"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
// import SearchIcon from "@/public/SearchIcon.svg";
import Image from "next/image";
import CardDokter from "@/components/CardDokter";

export const SearchIcon = (props: { className: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z"
        stroke="#046E89"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const jadwalDokter = [
  {
    id_dokter: "1",
    nama: "Dr. Andi Susanto",
    spesialisasi: "Dokter Umum",
    url: "../public/placeholder.svg",
    jadwal: ["09:00 - 12:00", "13:00 - 16:00", "10:00 - 14:00"],
  },
  {
    id_dokter: "2",
    nama: "Dr. Siti Aminah",
    spesialisasi: "Dokter Gigi",
    url: "../public/placeholder.svg",
    jadwal: ["10:00 - 12:00", "14:00 - 17:00"],
  },
  {
    id_dokter: "3",
    nama: "Dr. Budi Santoso",
    spesialisasi: "Dokter Spesialis Anak",
    url: "../public/placeholder.svg",
    jadwal: [
      "08:00 - 11:00",
      "09:00 - 12:00",
      "10:00 - 13:00",
      "08:00 - 11:00",
      "09:00 - 12:00",
      "10:00 - 13:00",
    ],
  },
  {
    id_dokter: "3",
    nama: "Dr. Budi Santoso",
    spesialisasi: "Dokter Spesialis Anak",
    url: "../public/placeholder.svg",
    jadwal: ["08:00 - 11:00", "09:00 - 12:00", "10:00 - 13:00"],
  },
];

export default function DokterPage() {
  const [filter, setFilter] = useState<string>("");

  console.log(filter);
  return (
    <>
      <div className="px-32 py-10">
        <div className="flex flex-row items-center gap-3">
          <Input
            placeholder="Ketik nama dokter atau gunakan filter"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            type="text"
            className="max-w-96 text-primaryCol"
            isClearable
            onClear={() => setFilter("")}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <h4 className="text-primaryCol">Search By Filter</h4>
        </div>
        <div className="grid grid-cols-2 gap-10 py-10">
          {jadwalDokter.map((jadwal, index) => {
            return <CardDokter {...jadwal} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
