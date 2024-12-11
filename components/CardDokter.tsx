import Image from "next/image";
import { Button, Link } from "@nextui-org/react";
import { useDayName } from "@/utils/useDayName";
import Placeholder from "@/public/placeholder-profile.png";

export type CardDokterProps = {
  id_pegawai: number;
  nama: string;
  nama_spesialisasi: string;
  url: string;
  jadwal: {
    id_jadwal: number;
    hari: string;
    start_time: string;
    end_time: string;
  }[];
};

export default function CardDokter(props: CardDokterProps) {
  const dokterUrl = props.id_pegawai + "-" + props.nama.split(" ").join("-");

  const dayName = useDayName();
  const tomorrow = dayName.getTomorrowDay();

  return (
    <div className="flex flex-col justify-between rounded-md px-10 py-6 shadow-md">
      <div className="flex flex-row gap-4 py-5">
        <Image
          src={Placeholder}
          alt={props.nama}
          width={40}
          height={40}
          className="aspect-square h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-bold">{props.nama}</p>
          <p className="text-[#B3B3B3]">Spesialis {props.nama_spesialisasi}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row gap-3 py-3">
        <span>
          Jam Praktik Besok <span className="font-semibold">({tomorrow})</span>:{" "}
        </span>
        <div className="">
          {props.jadwal.map((item, index) => {
            if (item.hari.toLowerCase() === tomorrow.toLowerCase())
              return (
                <p key={index}>
                  {item.start_time} - {item.end_time}
                </p>
              );
          })}
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
