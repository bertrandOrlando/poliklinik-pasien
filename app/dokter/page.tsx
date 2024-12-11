"use client";

import { Input } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import CardDokter, { CardDokterProps } from "@/components/CardDokter";

import AxiosInstance from "@/utils/AxiosInstance";

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

export default function DokterPage() {
  const [jadwal, setJadwal] = useState<CardDokterProps[]>([]);
  const [jadwalFiltered, setJadwalFiltered] = useState<CardDokterProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      AxiosInstance.get("/api/jadwal-praktik").then((response) => {
        setJadwal(response.data);
        setJadwalFiltered(response.data);
      });
    };

    getData();
  }, []);

  const nameFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;

    const newJadwal = jadwal.filter((item) =>
      item.nama.toLowerCase().includes(filterValue.toLowerCase()),
    );

    setJadwalFiltered(newJadwal);
  };

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
            onClear={() => setJadwalFiltered(jadwal)}
            onChange={nameFilterHandler}
          />
          <h4 className="text-primaryCol">Search By Filter</h4>
        </div>
        <div className="grid grid-cols-2 gap-10 py-10">
          {jadwalFiltered.map((item: CardDokterProps, index: number) => {
            if (item.jadwal.length > 0)
              return <CardDokter {...item} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
