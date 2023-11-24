"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import Logo from "./Logo";
import { UrlPath } from "@/app/contants/urlPath";
import '../../../globals.css';

const Navbar = ({ toggle, menuItems, profileMenuItems }: { toggle: () => void, menuItems: any, profileMenuItems: any }) => {
  const pathname = usePathname();
  const onProfileClick = () => {
    // if is logged in then allow dropdown
    if (menuItems?.length) return;

    window.location.href = UrlPath.login;
  }

  const onLogout = () => {
    localStorage.removeItem('user');
    window.location.href = UrlPath.home;
  }

  const profileMenu = useMemo(() => {
    return (
      <>
        <div
          className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          onClick={onProfileClick}
        >
          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
        <div id='userDropdown' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'>
          <div className={`${!menuItems?.length ? 'hidden' : ''}`}>
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby="avatarButton">
              {
                profileMenuItems?.map((profileItem: any, id: any) => (
                  <li key={id}>
                    <a href={profileItem?.href} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{profileItem?.label}</a>
                  </li>
                ))
              }
            </ul>
            <div className="py-1">
              <a
                onClick={onLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              >Sign out</a>
            </div>
          </div>
        </div>
      </>
    )
  }, [menuItems?.length, onProfileClick, onLogout, profileMenuItems]);

  return (
    <nav aria-label='main-menu' className="w-full h-20 bg-white sticky top-0 my-6 mt-0 z-10">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#0DA89B4D"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
          <ul className="hidden md:flex gap-x-6 text-black ">
            {
              menuItems?.map((item: any) => (
                <li
                  key={item.label}
                  style={{
                    color: `${item.href === pathname ? 'var(--primary-color-700)' : ''}`
                  }}
                >
                  <Link href={item.href}>
                    <p>{item.label}</p>
                  </Link>
                </li>
              ))
            }
          </ul>
          <div className="hidden md:block">
            {profileMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
