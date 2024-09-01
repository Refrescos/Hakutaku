"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaPlusCircle, FaGithub } from "react-icons/fa";
import Image from "next/image";

export function Component() {
  return (
    <Navbar fluid rounded className="bg-opacity-70">
      <Navbar.Brand href="#">
        <img src="/logoWithIcon.png" className="mr-3 h-6 sm:h-9" alt="Hakutaku Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2 items-center gap-20">
        <Navbar.Collapse>
          <Navbar.Link
            target="_blank"
            href="https://github.com/Refrescos/Hakutaku"
            className="flex flex-row gap-2 justify-center items-center"
          >
            Github <FaGithub size={20} color="black" />
          </Navbar.Link>
          <Navbar.Link
            target="_blank"
            href="https://starkbank.movidesk.com/kb/pt-br"
            className="flex flex-row gap-2"
          >
            Help
            <Image src="/info.png" alt="Help icon" width={20} height={20} />
          </Navbar.Link>
          <Navbar.Link
            target="_blank"
            href="https://starkbank.com/docs/api"
            className="flex flex-row gap-2"
          >
            API Documentation
            <Image src="/docs.png" alt="API documentation icon" width={20} height={20} />
          </Navbar.Link>
        </Navbar.Collapse>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img="/people.png" rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Guest</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
