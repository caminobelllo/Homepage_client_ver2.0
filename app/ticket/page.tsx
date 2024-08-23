'use client';
import { useEffect, useState } from 'react';
import LocationModal from '@/components/popups/ticket/LocaltionModal';
import TicketOption from '@/components/templates/ticket/TicketOption';
import Bar from '@/components/ui/Bar';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from '@/components/templates/ticket/DropdownMenu';
import { information } from '@/components/data/Information';

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

const Page = () => {
  const loc = information.locationDetails;
  const [isDays, setIsDays] = useState(false);
  const [nowUrl, setNowUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [active, setActive] = useState(isDays);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setActive(isDays);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 600;
      const newOpacity = Math.max(1 - scrollPosition / threshold, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDays]);

  useEffect(() => {
    setIsDays(information.isDays);
  }, []);

  useEffect(() => {
    setNowUrl(window.location.href);

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');

        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(
              37.55099593968109,
              126.92401144435387
            ),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(
            37.55099593968109,
            126.92401144435387
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            draggable: true,
          });

          window.kakao.maps.event.addListener(marker, 'click', function () {
            window.open('https://place.map.kakao.com/23696074', '_blank');
          });
        }
      });
    };
    return () => {
      document.head.removeChild(script);
    };
  }, [apikey]);

  const copyUrl = () => {
    navigator.clipboard.writeText(nowUrl).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  const copyLocation = () => {
    navigator.clipboard.writeText(loc).then(() => {
      alert('주소가 복사되었습니다!');
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 834) {
        closeModal();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex relative flex-col top-16 h-[1150px] mb:h-[1000px] w-full pad:w-[768px] dt:w-[1200px] mx-auto z-10">
      <div className="flex flex-col pad:flex-row pad:mt-8 pad:h-[328px] w-full pad:w-full dt:h-[376px] dt:justify-center mx-auto">
        <Image
          src="/image/ticket/Poster.avif"
          alt="포스터사진"
          width={833}
          height={376}
          className={`z-[-1] sticky top-0 w-full h-auto mb:w-[300px] pad:w-[246px] pad:h-[328px] dt:w-[282px] dt:h-[376px] mb:rounded-xl mx-auto pad:mx-0 transition-opacity duration-300 ${opacity < 1 ? 'opacity-100' : 'opacity-0'}`}
          style={
            isClient && window.innerWidth <= 500
              ? { opacity: opacity, transition: 'opacity 0.3s ease-out' }
              : { opacity: 1 }
          }
        />
        <div className="z-10 bg-gray-0 flex flex-col w-full h-[355px] mb:w-[350px] pad:w-full dt:w-[338px] px-4 pt-6 pad:pt-0 pad:mt-2 pad:ml-8 mx-auto dt:mr-0 pad:px-0">
          <div
            className={`inline-flex rounded-[32px] gap-2.5 items-center justify-center py-1 px-3 w-[84px] h-8 text-[16px]
          ${isDays ? 'bg-primary-50 text-gray-0' : 'bg-gray-10 text-gray-50'}`}
          >
            {isDays ? '예매 가능' : '예매 마감'}
          </div>
          <div className="mt-5 pad:mt-4 gap-1 pad:gap-4 flex flex-row">
            <p className="min-w-[190px] pad:w-[217px] pad:max-w-[217px] h-9 text-gray-90 font-semibold leading-9 text-[20px] pad:text-[24px] whitespace-nowrap">
              {information.title}
            </p>
            <div onClick={copyUrl} className="flex flex-col justify-center">
              <Image
                src="/image/ticket/share.svg"
                alt="share"
                width={24}
                height={24}
                className="cursor-pointer h-5 w-5 pad:h-6 pad:w-6"
              />
            </div>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal gap-6 h-7">
            <p className="text-gray-40 w-7 pad:w-8">장소</p>
            <p className="text-gray-90 w-[65px]">{information.location}</p>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal gap-6 h-7">
            <p className="text-gray-40 w-7 pad:w-8">일시</p>
            <p className="text-gray-90 w-40">{information.dateForString}</p>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal">
            <p className="text-gray-40 w-7 pad:w-8 h-7">가격</p>
            <div className="ml-6 flex flex-col">
              {/*
              <div className="flex flex-row items-start h-7">
                <p className="text-gray-90 w-[74px] pad:w-[83px] ">
                  신입생 티켓
                </p>
                <p className="text-primary-50 w-7 pad:w-8 ml-6 font-semibold">
                  {information.tickets.freshman.price}
                </p>
                <p className="text-gray-40 text-[14px] font-normal ml-2 flex justify-center w-[68px]">
                  1인 최대 {information.tickets.freshman.maxQuantity}매
                </p>
              </div>
              <div className="flex flex-row items-start h-7 mt-2 pad:mt-5">
              */}
              <div className="flex flex-row items-start h-7 mb-9 pad:mb-12">
                <p className="text-gray-90 w-[60px] pad:w-[67px]">일반 티켓</p>
                <p className="text-primary-50 w-[58px] pad:w-[66px] ml-10 font-semibold">
                  {information.tickets.general.price}
                </p>
                <p className="text-gray-40 text-[14px] font-normal ml-2 flex justify-center w-[70px]">
                  1인 최대 {information.tickets.general.maxQuantity}매
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/ticket/search/"
            className="mx-auto dt:ml-[56px] mt-[21px] w-full dt:w-[280px] h-[52px] dt:h-[60px] flex pad:hidden dt:flex flex-shrink-0 text-center items-center justify-center text-gray-60 dt:text-gray-0 bg-gray-5 dt:bg-primary-50 rounded-xl text-[18px] font-medium dt:mr-0 "
          >
            예매 조회/취소
          </Link>
        </div>
        <div className="z-20 bg-gray-0 h-[40px] w-[100vw] flex pad:hidden items-center" />
        <div className="flex z-10 flex-shrink-0 pad:hidden w-full mb:w-[328px] pad:w-full h-2 bg-gray-5 mx-auto" />
        <div className="z-20 bg-gray-0 h-[24px] w-[100vw] flex pad:hidden items-center" />
        <div className="flex z-10 bg-gray-0 pad:hidden dt:flex flex-col w-[100%] px-4 mb:px-0 mb:w-[328px] pad:ml-[164px] pad:mt-[120px] h-[282px] mx-auto">
          <p className="text-[16px] pad:text-[18px] font-medium left-9 text-primary-60 pad:text-primary-50 h-[27px]">
            공연장 위치
          </p>
          <div className="flex flex-row gap-3 mt-1">
            <p className="text-[16px] pad:text-[20px] font-medium leading-[30px] text-gray-90 text-center w-[194px] pad:w-[294px] whitespace-nowrap truncate">
              {loc}
            </p>
            <div
              onClick={copyLocation}
              className="flex flex-row cursor-pointer items-center gap-1"
            >
              <Image
                src="/image/ticket/copy.svg"
                width={20}
                height={20}
                alt="copy"
              />
              <p className="text-gray-40 font-medium text-[16px] leading-6">
                복사
              </p>
            </div>
          </div>
          <div
            id="map"
            className="top-[11px] w-full h-[calc(100vw*192/328)] max-h-[192px] pad:max-h-[225px] mb:w-[328px] pad:w-[384px] mb:h-[192px] pad:h-[225px] rounded-xl flex-shrink-0 z-0"
          />
          <div className="min-h-[164px]" />
        </div>
      </div>
      <div className="w-full h-[98px] bg-gray-0 bottom-0 z-40 left-0">
        <DropdownMenu isDays={isDays} />
        <div className="w-[100%] hidden pad:flex flex-row gap-[18px] mt-4 ">
          <button
            onClick={openModal}
            className="w-[384px] h-[60px] flex dt:hidden flex-shrink-0 text-center items-center justify-center text-gray-0 bg-gray-90 rounded-xl text-[18px] font-medium underline"
          >
            공연장 위치 ↗
          </button>
          <Link
            href="/ticket/search/"
            className="w-[384px] h-[60px] flex dt:hidden flex-shrink-0 text-center items-center justify-center text-gray-0 bg-primary-50 rounded-xl text-[18px] font-medium"
          >
            예매 조회/취소
          </Link>
        </div>
        <Bar className="mt-10 hidden pad:flex w-[768px] dt:w-[1200px]" />
        <TicketOption isDays={isDays} />
        <LocationModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};
export default Page;
