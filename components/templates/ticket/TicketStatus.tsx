import Image from 'next/image';

interface TicketStatusProps {
  reservation_id: string;
  buyer: string;
  phone_num: string;
  student_id: string;
  state: string;
  type: string;
}

const stateMap: Record<string, string> = {
  WAIT: '결제 대기',
  FINISH_PAYMENT: '결제 완료',
  CANCEL_REQUEST: '취소 요청',
  CANCEL_COMPLETE: '취소 완료',
};

const TicketStatus: React.FC<TicketStatusProps> = ({
  reservation_id,
  buyer,
  phone_num,
  student_id,
  state,
  type,
}) => {
  const statusText = stateMap[state];
  const copyReservationId = () => {
    navigator.clipboard.writeText(reservation_id).then(() => {
      alert('예매번호가 복사되었습니다!');
    });
  };

  const copyBankAccount = () => {
    navigator.clipboard.writeText('100075789563').then(() => {
      alert('계좌번호가 복사되었습니다!');
    });
  };

  return (
    <div className="flex flex-row w-full px-4 pad:px-12 my-10">
      <Image
        src="/image/ticket/Poster.avif"
        alt="포스터사진"
        width={289}
        height={357}
        className="hidden pad:flex flex-shrink-0 rounded-xl dt:w-[198px] dt:h-[263px]"
      />
      <div className="flex flex-col pad:ml-8 mt-2 w-full pad:w-[389px]">
        <p className="h-[36px] text-[22px] pad:text-[24px] font-semibold leading-6 text-gray-90 ">
          2024년 9월 정기 공연
        </p>
        <p className="h-[30px] text-[18px] pad:text-[20px] font-medium leading-5 text-gray-40">
          2024.09.02 MON 19:00
        </p>
        <div className="w-full dt:w-[670px] h-[1px] bg-gray-10 flex flex-shrink-0 mt-6" />
        <div className="flex flex-col dt:flex-row text-[16px] pad:text-[18px] font-medium leading-7 mt-4 pad:mt-7">
          <div className="flex flex-row h-[27px]">
            <p className="text-gray-40 w-[67px] ">예매자</p>
            <p className="text-gray-80 w-[129px] ml-[39px]">{buyer}</p>
          </div>
          <div className="flex flex-row h-[27px] mt-4 pad:mt-7 dt:mt-0">
            <p className="text-gray-40 w-[67px] dt:ml-[104px]">예매번호</p>
            <p className="text-gray-80 w-[125px] pad:w-[135px] dt:w-[155px] ml-[39px]">
              {reservation_id}
            </p>
            <div
              onClick={copyReservationId}
              className="flex items-center justify-start cursor-pointer"
            >
              <Image
                src="/image/ticket/copy.svg"
                width={20}
                height={20}
                alt="copy"
                className="w-4 h-4 pad:w-5 pad:h-5"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col dt:flex-row text-[16px] pad:text-[18px] font-medium leading-7 mt-4 pad:mt-7">
          <div className="flex flex-row h-[27px]">
            <p className="text-gray-40 w-[67px] ">전화번호</p>
            <p className="text-gray-80 w-[129px] ml-[39px]">{phone_num}</p>
          </div>
          <div className="flex flex-row h-[27px] mt-4 pad:mt-7 dt:mt-0">
            <p className="text-gray-40 w-[67px] dt:ml-[104px]">예매상태</p>
            <p className="text-gray-80 w-[135px] ml-[39px]">{statusText}</p>
          </div>
        </div>
        {type === 'FRESHMAN' && (
          <div className="flex flex-row h-[27px] text-[16px] pad:text-[18px] font-medium leading-7 mt-4 pad:mt-7">
            <p className="text-gray-40 w-[67px] ">학번</p>
            <p className="text-gray-80 w-[129px] ml-[39px]">{student_id}</p>
          </div>
        )}
        {
          <div className="flex flex-row h-[27px] text-[16px] pad:text-[18px] font-medium leading-7 mt-4 pad:mt-7">
            <p className="text-gray-40 w-[67px] ">계좌번호</p>
            <p className="text-gray-80 w-[185px] pad:w-[210px] ml-[39px] whitespace-nowrap">
              토스뱅크 100075789563
            </p>
            <div
              onClick={copyBankAccount}
              className="flex items-center justify-start cursor-pointer"
            >
              <Image
                src="/image/ticket/copy.svg"
                width={20}
                height={20}
                alt="copy"
                className="w-4 h-4 pad:w-5 pad:h-5"
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default TicketStatus;
