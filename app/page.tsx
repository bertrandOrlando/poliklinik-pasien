import Image from "next/image";
import HomepageBG from "@/public/HomepageBG.png";
import LogoVida from "@/public/LogoVida.png";
import About from "@/public/About.jpeg";
import InfoLogo from "@/public/InfoLogo.png";
import Hospital from "@/public/Hospital.jpg";
import HospitalRoom from "@/public/HospitalRoom.jpg";
import CheckRoom from "@/public/CheckRoom.jpg";
import HospitalDorm from "@/public/HospitalDorm.jpg";
import ProfileLogo from "@/public/ProfileLogo.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Image
          src={HomepageBG}
          alt="Homepage Image"
          className="max-h-screen w-full scale-x-[-1] transform object-cover blur-sm filter"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-center">
          <div className="px-4 text-white sm:px-8">
            <Image
              src={LogoVida}
              alt="Logo 2"
              className="mx-auto mb-4 h-[290px] w-[320px] brightness-0 invert filter"
            />
            <p className="mb-6 text-3xl font-bold">
              Menghubungkan kesehatan Indonesia melalui jaringan klinik
              terstandarisasi
            </p>
            <Link
              href="/dokter"
              className="inline-block rounded-lg bg-primaryCol px-8 py-3 font-medium text-white transition hover:bg-secondaryCol"
            >
              Buat Janji Temu
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-20 my-8 flex items-center justify-between px-20 py-10">
        <div className="w-1/2 flex-shrink-0">
          <Image
            src={About}
            alt="About Image"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="flex w-1/2 flex-col gap-6 pl-8">
          <h2 className="text-4xl font-semibold text-primaryCol">
            Tentang Klinik Vida
          </h2>
          <p className="text-sm text-gray-700">Terpercaya sejak 2010</p>
          <p className="text-gray-700">
            Kami adalah klinik kesehatan terpercaya yang berkomitmen untuk
            memberikan pelayanan kesehatan terbaik kepada masyarakat.
          </p>
          <p className="text-gray-700">
            Mengusung visi untuk meningkatkan kualitas hidup masyarakat, Vida
            Clinic selalu mengutamakan kenyamanan dan keamanan pasien. Dengan
            tim dokter dan tenaga medis profesional, kami hadir untuk memenuhi
            kebutuhan kesehatan Anda dan keluarga. Pilih Vida Clinic sebagai
            langkah pertama menuju hidup yang lebih sehat dan bahagia. Kesehatan
            Anda adalah prioritas kami.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-28 py-10">
        <h2 className="mb-2 text-left text-3xl font-semibold text-primaryCol">
          Layanan Tersedia
        </h2>
        <p className="mb-8 text-left text-gray-600">
          Dukungan Layanan Lengkap Untuk Kesehatan Anda
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Konsultasi Dokter Umum
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Layanan ini memberikan kesempatan bagi pasien untuk berkonsultasi
              dengan dokter umum mengenai berbagai masalah kesehatan
              sehari-hari. Dokter akan mendiagnosis gejala, memberikan resep
              obat, dan memberikan saran pengobatan yang tepat untuk kondisi
              Anda.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Konsultasi Spesialis
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Vida Clinic juga menyediakan layanan konsultasi dengan dokter
              spesialis di berbagai bidang, seperti spesialis anak, spesialis
              kulit, dan lainnya. Pasien yang membutuhkan penanganan lebih
              lanjut dapat diarahkan ke spesialis yang sesuai dengan keluhan
              mereka.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Pemeriksaan Laboratorium
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Kami menyediakan layanan pemeriksaan laboratorium lengkap untuk
              membantu diagnosis penyakit. Pemeriksaan darah, urin, dan tes
              laboratorium lainnya dilakukan dengan peralatan modern untuk
              memastikan hasil yang akurat dan cepat.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">Vaksinasi</h3>
            </div>
            <p className="text-sm text-gray-600">
              Vida Clinic menawarkan berbagai jenis vaksin untuk perlindungan
              kesehatan, mulai dari vaksinasi rutin untuk anak-anak hingga
              vaksin untuk orang dewasa seperti vaksin flu dan vaksin COVID-19.
              Vaksinasi dilakukan dengan prosedur yang aman dan diawasi oleh
              tenaga medis terlatih.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Fisioterapi dan Rehabilitasi
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Layanan fisioterapi kami dirancang untuk membantu pasien yang
              mengalami masalah pada sistem otot dan persendian. Kami
              menggunakan metode modern dan terapi yang disesuaikan untuk setiap
              pasien, guna mempercepat pemulihan dan meningkatkan mobilitas.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <Image src={InfoLogo} alt="Info Logo" className="mr-2 h-6 w-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Pemeriksaan Kesehatan Berkala
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Layanan ini ditujukan untuk memeriksa kondisi kesehatan secara
              menyeluruh, termasuk pemeriksaan jantung, paru-paru, dan organ
              tubuh lainnya. Pemeriksaan rutin ini penting untuk mendeteksi
              masalah kesehatan sejak dini, sehingga pengobatan dapat dilakukan
              lebih cepat dan lebih efektif.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="flex justify-between">
          <div className="aspect-square h-80 w-80 overflow-hidden">
            <Image
              src={Hospital}
              alt="Image 1"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="aspect-square h-80 w-80 overflow-hidden">
            <Image
              src={HospitalRoom}
              alt="Image 2"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="aspect-square h-80 w-80 overflow-hidden">
            <Image
              src={CheckRoom}
              alt="Image 3"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="aspect-square h-80 w-80 overflow-hidden">
            <Image
              src={HospitalDorm}
              alt="Image 4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-20 px-20 py-10">
        <h1 className="mb-10 text-left text-3xl font-semibold text-primaryCol">
          Cerita dari Pengguna Kami
        </h1>
        <div className="grid grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Pelayanan Luar Biasa
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Saya sangat puas dengan pelayanan di Vida Clinic. Dokter dan
              stafnya sangat ramah, profesional, dan perhatian terhadap
              kebutuhan pasien. Saya merasa didengar dan dipahami selama
              konsultasi. Sangat merekomendasikan klinik ini untuk siapa pun
              yang mencari layanan kesehatan berkualitas tinggi!
            </p>
            <div className="flex items-center">
              <Image
                src={ProfileLogo}
                alt="Reviewer"
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Michael Susanto
                </p>
                <p className="text-xs text-gray-500">2 Desember 2024</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Fasilitas Modern
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Saya sangat terkesan dengan fasilitas yang ada di Vida Clinic.
              Semua peralatan medis yang digunakan sangat modern dan canggih,
              memberikan rasa aman dan nyaman selama pemeriksaan. Klinik ini
              benar-benar memprioritaskan kenyamanan dan kualitas layanan untuk
              pasien.
            </p>
            <div className="flex items-center">
              <Image
                src={ProfileLogo}
                alt="Reviewer"
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Zakki Narendra
                </p>
                <p className="text-xs text-gray-500">15 November 2024</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Pengalaman Memuaskan
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Pengalaman saya di Vida Clinic sangat memuaskan. Dari proses
              pendaftaran hingga pemeriksaan, semuanya berjalan lancar dan
              cepat. Stafnya sangat membantu, dan dokter memberikan penjelasan
              yang sangat jelas dan detail. Saya merasa sangat dihargai sebagai
              pasien.
            </p>
            <div className="flex items-center">
              <Image
                src={ProfileLogo}
                alt="Reviewer"
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Budi Santoso
                </p>
                <p className="text-xs text-gray-500">27 November 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-20 mb-20 mt-5 px-20 text-center text-3xl italic text-gray-600">
        “I believe that the greatest gift you can give your family and the world
        is a healthy you.” - Joyce Meyer
      </p>
    </>
  );
}
