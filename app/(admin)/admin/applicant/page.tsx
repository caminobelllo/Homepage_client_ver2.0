'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import applicant_image from '@/public/image/admin/image.svg';
import { useState } from 'react';
import ApplicantCard from '@/components/admin/applicant/ApplicantCard';
import chevron_down_blue from '@/public/image/performance/chevron-down-blue.svg';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import { totalApplicant } from '@/atoms';
import { useRecoilState } from 'recoil';
import {
  DynamicRecruitingInfo,
  recruitingInfo,
} from '@/components/data/RecruitingInfo';
import PublishIcon from '@mui/icons-material/Publish';

interface ApplicantProps {
  id: number;
  name: string;
  phone_num: string;
  birth_date: string;
  gender: string;
  address: string;
  major: string;
  first_preference: string;
  second_preference: string;
  motive: string;
  experience_and_reason: string;
  play_instrument: string;
  readiness: string;
}

const page = () => {
  const router = useRouter();
  const sessionArr = ['ALL', '보컬', '기타', '드럼', '베이스', '신디'];
  const [session, setSession] = useState('ALL');
  const [applicantList, setApplicantList] = useState<ApplicantProps[]>([]);
  const [shownList, setShownList] = useState<ApplicantProps[]>([]);
  const [total, setTotal] = useRecoilState(totalApplicant);
  const [showMore, setShowMore] = useState(false);

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

      link.download = 'applicant_list.xlsx';

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (error: any) {}
  };

  const handleMore = () => {
    setShowMore(!showMore);
  };

  const fetchAllApplicantList = async () => {
    try {
      const response = await authInstance.get('/admin/apply/all');
      setApplicantList(response.data.result.applies);
      setShownList(response.data.result.applies.slice(0, 9));
      setTotal(response.data.result.total);
    } catch (error) {}
  };

  const fetchApplicantList = async (session: string) => {
    var preference = '';

    if (session === '보컬') {
      preference = 'VOCAL';
    } else if (session === '기타') {
      preference = 'GUITAR';
    } else if (session === '드럼') {
      preference = 'DRUM';
    } else if (session === '베이스') {
      preference = 'BASS';
    } else if (session === '신디') {
      preference = 'SYNTHESIZER';
    } else {
      fetchAllApplicantList();
      return;
    }
    try {
      const response = await authInstance.get(
        `/admin/apply?preference=${preference}`
      );
      setApplicantList(response.data.result.applies);
      setShownList(response.data.result.applies.slice(0, 9));
    } catch (error) {}
  };

  useEffect(() => {
    if (showMore) {
      setShownList(applicantList);
    } else {
      setShownList(applicantList.slice(0, 9));
    }
  }, [showMore]);

  useEffect(() => {
    fetchAllApplicantList();
  }, []);

  useEffect(() => {
    fetchApplicantList(session);
  }, [session]);

  return (
    <div className="w-full h-full">
      <div className="font-pretendard w-full pt-[64px] flex flex-col items-center">
        <div className="w-full h-[259px] bg-gray-5 flex justify-between px-[360px]">
          <div className="flex flex-col mt-16">
            <span className="font-mustica text-[40px] text-gray-90 font-semibold leading-10 pb-[15px]">
              Applicant
            </span>
            <section className="flex gap-2 pb-10 items-center">
              <span className="font-pretendard text-2xl text-gray-90 font-semibold leading-9">
                {DynamicRecruitingInfo.num}기 지원자 정보
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
            <section className="w-[504px] h-8 rounded-[32px] bg-gray-0">
              {sessionArr.map((sessionName) => (
                <div
                  key={sessionName}
                  onClick={() => {
                    setSession(sessionName);
                  }}
                  className={`${session === sessionName ? 'bg-primary-50' : 'bg-gray-0'} " w-[84px] inline-flex px-[12px] py-[4px] justify-center items-center gap-[10px] rounded-[32px] cursor-pointer "`}
                >
                  <span
                    key={sessionName}
                    className={`${session === sessionName ? 'text-gray-0' : 'text-gray-50'} " text-center font-pretendard text-[16px] font-medium leading-6 "`}
                  >
                    {sessionName}
                  </span>
                </div>
              ))}
            </section>
          </div>
          <Image src={applicant_image} alt="image" width={377} height={244} />
        </div>
        <div className="w-full h-full px-[360px] pt-8 grid grid-cols-3 gap-x-6 gap-y-10">
          {/* 카드 섹션 */}
          {shownList.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              id={applicant.id}
              name={applicant.name}
              phone_num={applicant.phone_num}
              birth_date={applicant.birth_date}
              gender={applicant.gender}
              address={applicant.address}
              major={applicant.major}
              first_preference={applicant.first_preference}
              second_preference={applicant.second_preference}
            />
          ))}
        </div>

        <div onClick={handleMore} className="flex mt-16 gap-2 cursor-pointer">
          {showMore ? (
            <span className="text-primary-50 text-center text-lg font-medium">
              닫기
            </span>
          ) : (
            <span className="text-primary-50 text-center text-lg font-medium">
              더보기
            </span>
          )}
          {showMore ? (
            <Image
              style={{ transform: 'rotate(180deg)' }}
              src={chevron_down_blue}
              alt="more"
              width={16}
              height={16}
            />
          ) : (
            <Image src={chevron_down_blue} alt="more" width={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
