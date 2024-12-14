"use client";

import Image from "next/image";
import LogoVida from "@/public/LogoVida.png";
import Background from "@/public/TempatAdministrasi.jpg";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DateInput,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import AxiosInstance from "@/utils/AxiosInstance";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../masuk/page";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// Zod Schema
const RegistrationSchema = z
  .object({
    nama: z
      .string()
      .min(2, { message: "Nama harus memiliki minimal 2 karakter" })
      .max(255, { message: "Nama harus memiliki maksimal 255 karakter" }),
    no_telp: z
      .string()
      .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh berisi angka" })
      .min(8, { message: "Nomor telepon minimal 8 digit" })
      .max(12, { message: "Nomor telepon maksimal 12 digit" }),
    email: z.string().email({ message: "Format email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: "Password harus mengandung huruf dan angka",
      }),
    confirm_password: z.string(),
    jenis_kelamin: z.enum(["laki", "perempuan"], {
      errorMap: () => ({ message: "Pilih jenis kelamin yang valid" }),
    }),
    tanggal_lahir: z.string().refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Tanggal lahir tidak valid" },
    ),
    id_kecamatan: z
      .number()
      .int()
      .positive({ message: "ID Kecamatan harus bilangan bulat positif" }),
    id_kelurahan: z
      .number()
      .int()
      .positive({ message: "ID Kelurahan harus bilangan bulat positif" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

type KecamatanType = {
  id_kecamatan: number;
  nama_kecamatan: string;
};

type KelurahanType = {
  id_kelurahan: number;
  nama_kelurahan: string;
  id_kecamatan: number;
};

export default function SigninPage() {
  const router = useRouter();

  // Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Submit Handler
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const onSubmit = async (data: RegistrationFormData) => {
    const { id_kecamatan, confirm_password, ...formData } = data;

    const finalFormData = {
      ...formData,
      id_kelurahan: Number(formData.id_kelurahan),
    };

    try {
      setIsSubmiting(true);

      await AxiosInstance.post("/api/pasien/register", finalFormData)
        .then((response) => {
          if (response.status === 200) {
            router.push("/masuk");
          }
        })
        .catch((err) => {
          setErrorSubmit("Gagal Melakukan Pendaftaran");
          console.error(err);
        });
    } catch (error) {
      setErrorSubmit("Gagal Melakukan Pendaftaran");
      console.error("Authentication error", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  // Password Visibility
  const [isPWVisible, setIsPWVisible] = useState<boolean>(false);
  const [isCPWVisible, setIsCPWVisible] = useState<boolean>(false);

  const togglePWVisibility = () => setIsPWVisible(!isPWVisible);
  const toggleCPWVisibility = () => setIsCPWVisible(!isCPWVisible);

  // Kelurahan Kecamatan
  const [kecamatanList, setKecamatanList] = useState<KecamatanType[]>([]);

  const [kelurahanList, setKelurahanList] = useState<KelurahanType[]>([]);

  const currentKecamatan = watch("id_kecamatan");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }

    const fetchKecamatan = async () => {
      try {
        const response = await AxiosInstance.get("/api/kecamatan");
        setKecamatanList(response.data);
      } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
      }
    };

    fetchKecamatan();
  }, []);

  useEffect(() => {
    const fetchKelurahan = async () => {
      if (currentKecamatan) {
        try {
          const response = await AxiosInstance.get(`/api/kelurahan`);
          const data = response.data.filter(
            (item: KelurahanType) => item.id_kecamatan === currentKecamatan,
          );
          setKelurahanList(data);
        } catch (error) {
          const err = error as AxiosError;
          console.error(err.message);
        }
      }
    };

    fetchKelurahan();
  }, [currentKecamatan]);

  return (
    <>
      <section className="flex min-h-screen flex-col md:flex-row">
        <div className="top-0 w-1/2 flex-1">
          <Image
            src={Background}
            alt="Image Tempat Administrasi"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-1/2 flex-col items-center justify-evenly gap-10 p-10">
          {/* <Image src={LogoVida} alt="Logo Vida" className="h[40%] w-[40%]" /> */}
          <h2 className="text-3xl font-semibold text-primaryCol">
            Daftar Akun
          </h2>

          <div className="h-auto w-full px-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-4 flex flex-col gap-y-4 bg-white"
            >
              <div className="grid grid-cols-1 gap-4 text-base lg:grid-cols-2">
                <h5 className="col-span-2 text-center text-red-700">
                  {errorSubmit}
                </h5>

                {/* Nama */}
                <Input
                  errorMessage={errors.nama?.message}
                  isInvalid={!!errors.nama}
                  label="Nama Lengkap"
                  placeholder="John Doe"
                  {...register("nama")}
                  variant="bordered"
                />

                {/* Nomor Telepon */}
                <Input
                  errorMessage={errors.no_telp?.message}
                  isInvalid={!!errors.no_telp}
                  label="Nomor telepon"
                  placeholder="081234567890"
                  {...register("no_telp")}
                  variant="bordered"
                />

                {/* Email */}
                <Input
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                  variant="bordered"
                />

                {/* Password */}
                <Input
                  {...register("password")}
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePWVisibility}
                    >
                      {isPWVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Password"
                  placeholder="Masukkan Password"
                  type={isPWVisible ? "text" : "password"}
                  variant="bordered"
                />

                {/* Confirm Password */}
                <Input
                  {...register("confirm_password")}
                  errorMessage={errors.confirm_password?.message}
                  isInvalid={!!errors.confirm_password}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleCPWVisibility}
                    >
                      {isCPWVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Konfirmasi Password"
                  placeholder="Konfirmasi password"
                  type={isCPWVisible ? "text" : "password"}
                  variant="bordered"
                />

                {/* Tanggal Lahir */}

                <Controller
                  name="tanggal_lahir"
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      label="Tanggal Lahir"
                      variant="bordered"
                      errorMessage={errors.tanggal_lahir?.message}
                      isInvalid={!!errors.tanggal_lahir}
                      onChange={(date) => {
                        if (date) {
                          const year = date.year;
                          let month = "0" + date.month;
                          let day = "0" + date.day;
                          month = month.substring(month.length - 2);
                          day = day.substring(day.length - 2);
                          field.onChange(`${year}-${month}-${day}`);
                        }
                      }}
                    />
                  )}
                />

                {/* Kecamatan */}
                <Controller
                  name="id_kecamatan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={kecamatanList}
                      errorMessage={errors.id_kecamatan?.message}
                      isInvalid={!!errors.id_kecamatan}
                      label="Pilih Kecamatan"
                      variant="bordered"
                      placeholder="Pilih Kecamatan"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined,
                        );
                      }}
                    >
                      {(kecamatan) => (
                        <SelectItem
                          key={kecamatan.id_kecamatan}
                          value={kecamatan.id_kecamatan}
                        >
                          {kecamatan.nama_kecamatan}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                {/* Kelurahan */}
                <Controller
                  name="id_kelurahan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={kelurahanList}
                      errorMessage={errors.id_kelurahan?.message}
                      isInvalid={!!errors.id_kelurahan}
                      placeholder="Pilih Kelurahan"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined,
                        );
                      }}
                      label="Pilih Kelurahan"
                      variant="bordered"
                    >
                      {(kelurahan) => (
                        <SelectItem
                          key={kelurahan.id_kelurahan}
                          value={kelurahan.id_kelurahan}
                        >
                          {kelurahan.nama_kelurahan}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                {/* Jenis Kelamin */}
                <Controller
                  name="jenis_kelamin"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      errorMessage={errors.jenis_kelamin?.message}
                      isInvalid={!!errors.jenis_kelamin}
                      label="Jenis Kelamin"
                      size="sm"
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <Radio value="perempuan">Perempuan</Radio>
                      <Radio value="laki">Laki-laki</Radio>
                    </RadioGroup>
                  )}
                />
              </div>
              <div>
                <button
                  className={`w-full rounded-full bg-primaryCol px-4 py-2 font-medium text-white transition focus:outline-none ${isSubmiting ? "cursor-default bg-slate-600" : "hover:bg-secondaryCol"}`}
                  type="submit"
                  disabled={isSubmiting}
                >
                  Daftar
                </button>
              </div>
              <p className="w-full text-right text-xs text-gray-600">
                Sudah memiliki akun?{" "}
                <Link
                  href="/masuk"
                  className="text-primaryCol underline hover:text-secondaryCol"
                >
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
