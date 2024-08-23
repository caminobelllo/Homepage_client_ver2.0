'use client';
import React from 'react';
import Image from 'next/image';

type MemberSelectionProps = {
  description: string;
  min: number;
  max: number;
  ticket: string;
  member: number;
  setMember: React.Dispatch<React.SetStateAction<number>>;
};

const MemberSelection: React.FC<MemberSelectionProps> = ({
  description,
  min,
  max,
  ticket,
  member,
  setMember,
}) => {
  const handleIncrement = () => {
    setMember((prevMember) => {
      const newMember = prevMember < max ? prevMember + 1 : prevMember;
      localStorage.setItem('member', newMember.toString());
      return newMember;
    });
  };

  const handleDecrement = () => {
    setMember((prevMember) => {
      const newMember = prevMember > min ? prevMember - 1 : prevMember;
      localStorage.setItem('member', newMember.toString());
      return newMember;
    });
  };

  const finalAmount = 5000 * member;

  return (
    <div className="flex flex-col mt-10 mb-10 px-4 pad:px-12 h-[83px] w-full">
      <div className="flex flex-col pad:flex-row h-[55px] pad:h-[30px] gap-1 pad:gap-0">
        <div className="font-semibold text-lg pad:text-xl leading-[30px] text-gray-90">
          예매 인원 선택
        </div>
        <div className="flex pad:ml-3 font-medium text-[16px] leading-6 text-gray-40 items-center">
          {description}
        </div>
      </div>
      <div className="mt-5 flex flex-row h-[24px] items-center">
        <div
          className={`cursor-pointer ${member <= min ? 'opacity-50' : ''}`}
          onClick={handleDecrement}
        >
          <Image
            src="/image/ticket/subtract.svg"
            alt="minus"
            height={24}
            width={24}
          />
        </div>
        <p className="ml-4">{member}</p>
        <div
          className={`cursor-pointer ml-4 ${member >= max ? 'opacity-50' : ''}`}
          onClick={handleIncrement}
        >
          <Image
            src="/image/ticket/addplus.svg"
            alt="plus"
            height={24}
            width={24}
          />
        </div>
        <p className="ml-16 text-primary-50 text-lg font-semibold">
          {ticket === 'freshman' ? '무료' : `${finalAmount.toLocaleString()}원`}
        </p>
      </div>
    </div>
  );
};

export default MemberSelection;
