'use client';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import './globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isCompletePage = pathname === '/ticket/complete';
  const isTicketPage = pathname === '/ticket';
  const isFreshmanTicketPage = pathname === '/ticket/freshman_ticket';
  const isGeneralTicketPage = pathname === '/ticket/general_ticket';
  const isCancelPage = pathname === '/ticket/cancel';
  const isReservationPage = pathname === '/ticket/reservation';
  const isSearchPage = pathname === '/ticket/search';

  const isNoticePage = pathname === '/recruit/notice';
  const isApplyCompletePage = pathname === '/recruit/complete';
  const isApplyPage = pathname === '/recruit/apply';
  const isLoginPage = pathname === '/login';
  const isAdminApplicantPage = pathname === '/admin/applicant';
  const isAdminTicketingPage = pathname === '/admin/ticketing';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 834);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <html lang="en">
        <head>
          <meta property="og:title" content="KAHLUA BAND" />
          <meta
            property="og:description"
            content="안녕하세요 홍익대학교 컴퓨터공학과 밴드부 Kahlua 입니다!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kahluaband.com" />
        </head>
        <body className={roboto.className}>
          <div className="font-pretendard w-full h-auto mb-40">
            {pathname === '/login' ||
            pathname === '/admin/applicant' ||
            pathname === '/admin/ticketing' ? (
              <AdminHeader />
            ) : (
              <Header />
            )}
            {children}
          </div>
          {!isCompletePage &&
            !isFreshmanTicketPage &&
            !isGeneralTicketPage &&
            !isCancelPage &&
            !isReservationPage &&
            !isSearchPage &&
            !isNoticePage &&
            !isApplyCompletePage &&
            !isApplyPage &&
            !isLoginPage &&
            !isAdminApplicantPage &&
            !isAdminTicketingPage &&
            !(isMobile && isTicketPage) && <Footer />}
        </body>
      </html>
    </>
  );
}
