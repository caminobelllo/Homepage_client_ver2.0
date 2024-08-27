'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import logo_black from '@/public/image/KAHLUA-black.svg';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import table_menu from '@/public/image/tabler_menu-2.svg';

const AdminHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerOpen(newOpen);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await authInstance.post('/auth/sign-out', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (response.data.isSuccess === true) {
        alert(response.data.result);
      }
      localStorage.clear();
      router.push('/');
    } catch (error) {}
  };

  return (
    // padding 수정 필요
    <div
      className={`font-pretendard w-full h-[64px] fixed z-10 bg-gray-0 flex flex-row items-center ${pathname === '/login' && width <= 834 ? 'justify-center' : 'justify-between px-[360px]'} ${pathname === '/admin/applicant' || (pathname === '/admin/ticketing' && width <= 1500) ? 'justify-center' : 'justify-between px-[360px]'}`}
    >
      <Link href="/admin/applicant" key="admin">
        <div className="inline-flex gap-5 items-center">
          <Image src={logo_black} alt="logo-black" height={24} />
          <h1 className="font-mustica text-2xl text-gray-60 font-semibold">
            Admin
          </h1>
        </div>
      </Link>
      <div>
        <div className="dt:hidden cursor-pointer fixed left-6 top-5">
          <Image
            src={table_menu}
            alt="moblie_menu_button"
            width={24}
            onClick={toggleDrawer(true)}
          />
        </div>
        {pathname === '/login' ? null : (
          <ul className="hidden dt:flex flex-row gap-[64px]">
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() => {
                router.push('/admin/applicant');
              }}
            >
              지원 관리
            </li>
            <li
              className="text-lg font-medium cursor-pointer"
              onClick={() => {
                router.push('/admin/ticketing');
              }}
            >
              예매 관리
            </li>
            <li
              className="text-lg font-medium text-danger-40 cursor-pointer"
              onClick={handleLogout}
            >
              로그아웃
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
