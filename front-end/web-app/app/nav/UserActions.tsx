"use client";
import { Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";

interface Props {
  user: Partial<User>;
}

const UserActions = ({ user }: Props) => {
  return (
    <Dropdown label={` Welcome ${user.name}`} dismissOnClick={false}>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Autions</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell My Car</Link>
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
