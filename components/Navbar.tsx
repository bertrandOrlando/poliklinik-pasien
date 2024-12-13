"use client";

import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import NavLogo from "@/public/NavLogo.png";
import ProfileIcon from "@/public/profile-round-svgrepo.svg";

export default function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");
  const [namaUser, setNamaUser] = useState<string>("");
  const items = [
    {
      key: "logout",
      label: "Logout",
      url: "/",
    },
  ];

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: { nama: string; role: string } = jwtDecode(token);
          setIsLoggedIn(true);
          setUserRole(decoded.role);
          setNamaUser(decoded.nama);
        } catch (error) {
          console.error("Invalid token:", error);
          setIsLoggedIn(false);
        }
      }
    };

    fetchToken();
  }, []);

  const handlerLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <Navbar
        classNames={{
          base: ["border-b-1 py-1"],
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
        maxWidth="xl"
      >
        <NavbarBrand>
          <Link href={"/"}>
            <Image alt="navigation logo" src={NavLogo} />
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem
            as={Link}
            className="mx-2 box-border border-black hover:border-b-3 hover:font-normal hover:text-black"
            href={"/dokter"}
          >
            Lihat Jadwal Dokter
          </NavbarItem>

          {!isLoggedIn ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button
                  as={Link}
                  className="bg-tertiaryCol font-normal"
                  href="/masuk"
                  variant="solid"
                >
                  Masuk
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  className="bg-primaryCol font-normal text-white"
                  href="/daftar"
                  variant="solid"
                >
                  Daftar
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem
                as={Link}
                className="mx-2 box-border border-black hover:border-b-3 hover:font-normal hover:text-black"
                href={"/pendaftaran"}
              >
                Pendaftaran dan Riwayat
              </NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="solid"
                    className="bg-primaryCol font-medium text-white"
                  >
                    <Image
                      src={ProfileIcon}
                      width={20}
                      height={20}
                      alt="profile image"
                    />
                    {namaUser}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                  {(item) => (
                    <DropdownItem
                      as={Link}
                      href={item.url}
                      key={item.key}
                      color={item.key === "logout" ? "danger" : "default"}
                      className={
                        item.key === "logout" ? "text-danger" : "text-black"
                      }
                      onClick={
                        item.key === "logout"
                          ? () => handlerLogout()
                          : undefined
                      }
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
