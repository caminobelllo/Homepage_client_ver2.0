'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ticketing_image from '@/public/image/admin/ticketing.svg';
import { useRecoilValue } from 'recoil';
import { totalTicket } from '@/atoms';
import TicketLists from '@/components/admin/ticketing/TicketLists';
import PublishIcon from '@mui/icons-material/Publish';
import { authInstance } from '@/api/auth/axios';
import { information } from '@/components/data/Information';

const page = () => {
  const typeArr = ['All', '신입생', '일반'];
  const [type, setType] = useState('All');
  const total = useRecoilValue(totalTicket);

  const getList = async () => {
    try {
      const response = await authInstance.get('/admin/tickets/download', {
        responseType: 'blob',
      });
      console.log(response.data);

      const blob = response.data;

      const fileObjectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileObjectUrl;
      link.style.display = 'none';

      link.download = 'ticket_list.xlsx';

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (error: any) {}
  };

  return (
    <div className="w-full h-full">
      <div className="font-pretendard w-full pt-[64px] flex flex-col items-center">
        <div className="w-full h-[259px] bg-gray-5 flex justify-between px-[360px]">
          <div className="flex flex-col mt-16">
            <span className="font-mustica text-[40px] text-gray-90 font-semibold leading-10 pb-[15px]">
              Ticketing List
            </span>
            <section className="flex gap-2 pb-10 items-center">
              <span className="font-pretendard text-2xl text-gray-90 font-semibold leading-9">
                {information.title}
              </span>
              <span className="font-pretendard text-2xl text-primary-50 font-semibold leading-9">
                {total}
              </span>
              <span
                className="w-4 px-4 cursor-pointer"
                onClick={() => getList()}
              >
                <PublishIcon sx={{ color: '#757A95' }} />
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
