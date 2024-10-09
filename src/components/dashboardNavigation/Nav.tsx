"use client";

import { RootState } from "@/redux/store";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(true);
  const session = useSession();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const authState = useTypedSelector((state) => state.auth.login.data);

  const handleSignOut = () => {
    signOut();
    localStorage.clear();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={() => setToggleNav((prev) => !prev)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <span className="flex items-center justify-center w-6 h-6 group-data-[open]:hidden ">
                <i aria-hidden="true" className="lni lni-menu" />
              </span>
              <span className="hidden items-center justify-center w-6 h-6 group-data-[open]:flex ">
                <i aria-hidden="true" className=" lni lni-close" />
              </span>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt="Your Company"
                src="/img/landing/logo/logo-white-square.svg"
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <span className="flex items-center justify-center w-6 h-6 group-data-[open]:hidden">
                <i aria-hidden="true" className="lni lni-alarm" />
              </span>
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full border-slate-800 bg-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>

                  <Image
                    alt=""
                    src={
                      session.data?.user?.image ||
                      `/img/avatars/${
                        (authState as any)?.avatar || "user.webp"
                      }`
                    }
                    className="h-8 w-8 rounded-full"
                    width={32}
                    height={32}
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href=""
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href=""
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href=""
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <div
        className={`transition duration-300 overflow-hidden ${
          toggleNav ? "h-0 " : "h-[192px]"
        } sm:hidden`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </div>
    </Disclosure>
  );
}
