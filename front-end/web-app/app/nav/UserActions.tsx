"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";

interface Props {
  user: User;
}

const UserActions = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setParams } = useParamsStore();

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") router.push("/");
  }
  function setSeller() {
    setParams({ winner: undefined, seller: user.username });
    if (pathname !== "/") router.push("/");
  }
  return (
    <Dropdown
      label={` Welcome ${user.name}`}
      dismissOnClick={false}
      color="red"
      outline
    >
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Autions
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell My Car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => signOut({ callbackUrl: "/" })}
        icon={AiOutlineLogout}
      >
        Logout
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserActions;
