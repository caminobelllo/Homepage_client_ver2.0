'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ticketing_image from '@/public/image/admin/ticketing.svg';
import { useRecoilValue } from 'recoil';
import { totalTicket } from '@/atoms';
import TicketLists from '@/components/admin/ticketing/TicketLists';

const page = () => {
  const typeArr = ['All', '신입생', '일반'];
  const [type, setType] = useState('All');
  const total = useRecoilValue(totalTicket);

  return (
    <div className="w-full h-full">
      <div className="font-pretendard w-full pt-[64px] flex flex-col items-center">
        <div className="w-full h-[259px] bg-gray-5 flex justify-between px-[360px]">
          <div className="flex flex-col mt-16">
            <span className="font-mustica text-[40px] text-gray-90 font-semibold leading-10 pb-[15px]">
              Ticketing List
            </span>
            <section className="flex gap-2 pb-10">
              <span className="font-pretendard text-2xl text-gray-90 font-semibold leading-9">
                2024 9월 정기공연
              </span>
              <span className="font-pretendard text-2xl text-primary-50 font-semibold leading-9">
                {total}
              </span>
            </section>
            <section className="w-[252px] h-8 rounded-[32px] bg-gray-0">
              {typeArr.map((typeName) => (
                <div
                  key={typeName}
                  onClick={() => {
                    setType(typeName);
                  }}
                  className={`${type === typeName ? 'bg-primary-50' : 'bg-gray-0'} " w-[84px] inline-flex px-[12px] py-[4px] justify-center items-center gap-[10px] rounded-[32px] cursor-pointer "`}
                >
                  <span
                    key={typeName}
                    className={`${type === typeName ? 'text-gray-0' : 'text-gray-50'} " text-center font-pretendard text-[16px] font-medium leading-6 "`}
                  >
                    {typeName}
                  </span>
                </div>
              ))}
            </section>
          </div>
          <Image src={ticketing_image} alt="image" width={443} height={259} />
        </div>
        {/* 데이터 섹션 */}
        <section className="w-full h-full flex flex-col items-center">
          <div className="w-[834px] h-[51px] bg-gray-90 rounded-t-3xl mt-8 font-pretendard flex justify-start items-center px-5">
            <div className="min-w-[100px] text-center text-lg font-medium text-gray-0">
              상태
            </div>
            <div className="min-w-[186px] text-center text-lg font-medium text-gray-0">
              예매 번호
            </div>
            <div className="min-w-[140px] text-center text-lg font-medium text-gray-0">
              이름
            </div>
            <div className="min-w-[160px] text-center text-lg font-medium text-gray-0">
              전화번호
            </div>
            <div className="min-w-[160px] text-center text-lg font-medium text-gray-0">
              매수
            </div>
          </div>
          <div className="max-w-[1200px] h-auto">
            <TicketLists type={type} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
