import Image from "next/image";
import React from "react";
import Placeholder from "@/public/placeholder.svg";
import { Button, Link } from "@nextui-org/react";
import axios from "axios";

type CardDokterProps = {
  id_dokter: string;
  nama: string;
  spesialisasi: string;
  url: string;
  jadwal: string[];
};

export default async function CardDokter(props: CardDokterProps) {
  const data = await axios.get("localhost:5000/pegawai/dokter");
  console.log(data);

  const dokterUrl = props.nama.split(" ").join("_");

  return (
    <div className="flex flex-col justify-between rounded-md px-10 py-6 shadow-md">
      <div className="flex flex-row gap-4 py-5">
        <Image
          src={props.url}
          alt={props.nama}
          width={40}
          height={40}
          className="aspect-square h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-bold">{props.nama}</p>
          <p className="text-[#B3B3B3]">Spesialis {props.spesialisasi}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row gap-3 py-3">
        <span>Jadwal Besok: </span>
        <div>
          {props.jadwal.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
      <Button
        as={Link}
        href={`dokter/${dokterUrl}`}
        className="w-full bg-primaryCol text-white"
      >
        Daftar
      </Button>
    </div>
  );
}
