"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon1 from "../public/icon1.png";
import Image from "next/image";
export function Component() {
  return (
    <Navbar fluid rounded className="bg-opacity-70">
      <Navbar.Brand href="#">
        <img src="/icon1.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">HAKUTAKU</span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center gap-20">
        <Navbar.Collapse >
				  <Navbar.Link href="#" className="flex flex-row gap-2">API <Image src="/info.png" alt="avatar" width={20} height={20}></Image></Navbar.Link>
				  
				  <Navbar.Link href="#" className="flex flex-row gap-2">API Documentation <Image src="/docs.png" alt="avatar" width={20} height={20}></Image></Navbar.Link>
        </Navbar.Collapse>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img="/people.png" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
