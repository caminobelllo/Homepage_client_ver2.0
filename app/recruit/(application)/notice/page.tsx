'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Divider } from '@mui/material';
import { useState } from 'react';
import {
  formatDay,
  formatMonth,
  formatYear,
  getOnlyNum,
  DynamicRecruitingInfo,
} from '@/components/data/RecruitingInfo';

const page = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleNextStep = () => {
    window.location.href = `/recruit/apply`;
  };

  return (
    <div className="flex flex-col relative top-16 items-center justify-start text-center mx-auto w-full pad:w-[786px] dt:w-[996px] h-auto mt-4">
      <div className="h-[200px] w-full pad:rounded-t-xl bg-gray-90 flex flex-col mx-aut">
        <p className="mt-10 text-gray-0 text-center text-[24px] pad:text-[32px] font-semibold leading-[48px]">
          지원 전 필독사항
        </p>
        <p className="mt-4 text-gray-20 text-center text-[16px] pad:text-[18px] font-normal leading-[27px] hidden pad:block">
          안녕하세요! 홍익대학교 컴퓨터공학과 밴드학회 깔루아입니다.
        </p>
        <p className="text-gray-20 text-center text-[16px] pad:text-[18px]  font-normal leading-[27px] max-pad:px-6">
          단순 인원 집계용으로 사용되는 가입 지원서이므로 부담 없이 작성해
          주시면 됩니다.
        </p>
      </div>
      <div className="w-full h-auto pad:rounded-b-xl pad:border border-gray-15 flex flex-col px-4 pad:px-12 py-10 text-left">
        <Activity />
        <VocalNotice />
        <OtherSessionNotice />
        <Divider />
        <Warning />
        <div className="w-full h-auto px-6 py-5 bg-gray-5 rounded-[12px]">
          <Checkbox
            id="notice"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className=""
          >
            위 필독사항을 모두 숙지했으며, 개인정보 수집에 동의합니다.
          </Checkbox>
        </div>
        <ul className="text-gray-40 text-[16px] pad:text-[18px] ml-6 pt-2 list-disc list-inside">
          <li>수집된 모든 개인정보는 모집이 마감된 후 파기됩니다.</li>
        </ul>
      </div>
      <button
        onClick={(e) => handleNextStep()}
        disabled={!isChecked}
        className={`flex justify-center items-center text-center h-[60px] w-[328px] pad:w-[384px] text-[18px] rounded-[12px] mt-[40px] ph:mb-[100px] pad:mb-[140px] dt:mb-[180px] ${isChecked ? 'bg-primary-50 text-gray-0' : 'bg-gray-10 text-gray-40 cursor-not-allowed'}`}
      >
        다음
      </button>
    </div>
  );
};

const Activity = () => {
  return (
    <div className="text-left h-auto">
      <p className="text-[18px] pad:text-[20px] font-semibold text-gray-90">
        깔루아 활동
      </p>
      <ul className="text-[16px] pad:text-[18px] text-gray-60 text-left mt-2 list-outside list-disc ml-[18px]">
        <li>
          홍익대학교 깔루아 {getOnlyNum(DynamicRecruitingInfo.num)}기의 활동
          기간은 1년 6개월로, {formatYear(DynamicRecruitingInfo.activityPeriod)}
          년 {formatMonth(DynamicRecruitingInfo.activityPeriod)}월 공연까지
          필수로 참여해야 합니다.
        </li>
        <li>
          깔루아는 공연이 있는 3월, 9월을 제외하고 매달 1만원의 회비를 냅니다.
          회비는 깔루아 전체 회비로 입금되며 동방 장비 수리, 교체, 공연 준비를
          위한 비용으로 사용됩니다.
        </li>
        <li>
          홍익대학교 깔루아 {getOnlyNum(DynamicRecruitingInfo.num)}기는 매주
          월요일 오후 6시 오프라인으로 정기 회의와 뒷풀이가 진행됩니다.
        </li>
        <li>활동 장소는 홍익대학교 T동 건물입니다.</li>
      </ul>
    </div>
  );
};

const VocalNotice = () => {
  return (
    <div className="mt-12 text-left h-auto">
      <p className="text-[18px] pad:text-[20px] font-semibold text-gray-90">
        보컬 세션 지원
      </p>
      <ul className="text-[16px] pad:text-[18px] text-gray-60 text-left mt-2 list-outside list-disc ml-[18px]">
        <li>
          보컬 지원자의 경우 대면 오디션과 별개로{' '}
          <span className="text-gray-80">지원 영상 제출이 필수</span>입니다.
        </li>
        <li>2-3곡을 자유롭게 선곡하여 영상으로 찍어주세요.</li>
        <li>가사를 보고 불러도 되니 편하게 지원해 주세요.</li>
        <li>제출 방식은 기재해 주신 연락처를 통해 개별 공지해 드립니다.</li>
      </ul>
    </div>
  );
};

const OtherSessionNotice = () => {
  return (
    <div className="mt-12 mb-10 text-left h-auto">
      <p className="text-[18px] pad:text-[20px] font-semibold text-gray-90">
        드럼 / 기타 / 베이스 / 신디사이저 세션 지원
      </p>
      <ul className="text-[16px] pad:text-[18px] text-gray-60 text-left mt-2 list-outside list-disc ml-[18px]">
        <li>별도의 지원 영상이 필요하지 않습니다.</li>
        <li>
          {formatMonth(DynamicRecruitingInfo.audition)}월{' '}
          {formatDay(DynamicRecruitingInfo.audition)}일 진행되는 오디션에만
          참여하시면 됩니다.
        </li>
      </ul>
    </div>
  );
};

const Warning = () => {
  return (
    <div className="mt-10 mb-10 text-left h-auto">
      <p className="text-[18px] pad:text-[20px] font-semibold text-danger-40">
        ! 주의사항
      </p>
      <ul className="text-[16px] pad:text-[18px] text-gray-90 text-left mt-2 list-outside list-disc ml-[18px]">
        <li>
          매주 진행되는 깔루아 정기 회의 및 뒷풀이에 필수로 참여할 수 있는 분만
          지원해주시기 바랍니다.
        </li>
        <li>세션은 2지망까지 지원받으며, 1지망에 합격되지 않을 수 있습니다.</li>
        <li>필독사항 미숙지로 인한 불이익은 책임지지 않습니다.</li>
      </ul>
    </div>
  );
};

export default page;
