import { authInstance } from '@/api/auth/axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { totalTicket } from '@/atoms';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material';
import Image from 'next/image';

const theme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '20px 28px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
        },
      },
    },
  },
});

interface TicketProps {
  id: number;
  status: string;
  reservation_id: string;
  buyer: string;
  phone_num: string;
  total_ticket: number;
  major: string | null;
  studentId?: string;
  meeting: string | null;
  members: TicketMemberProps[] | null;
}

interface TicketMemberProps {
  id: number;
  name: string;
  phone_num: string;
}

const TicketLists = ({ type }: { type: string }) => {
  const router = useRouter();
  const [allTicketList, setAllTicketList] = useState<TicketProps[]>([]);
  const [generallTicketList, setGeneralTicketList] = useState<TicketProps[]>(
    []
  );
  const [freshmanTicketList, setFreshmanTicketList] = useState<TicketProps[]>(
    []
  );
  const ticketList =
    type === '신입생'
      ? freshmanTicketList
      : type === '일반'
        ? generallTicketList
        : allTicketList;

  const [total, setTotal] = useRecoilState(totalTicket);
  const [members, setMembers] = useState<TicketMemberProps[][]>([]);

  const getAllTicketList = async () => {
    try {
      const response = await authInstance.get('/admin/tickets');
      setAllTicketList(response.data.result.tickets);
      setTotal(response.data.result.total);

      const newMembers = response.data.result.tickets.map(
        (ticket: TicketProps) => ticket.members || []
      );
      setMembers(newMembers);
    } catch (error: any) {
      if (error.response.status === 401) {
        alert('로그인이 필요합니다.');
        router.push('/login');
      }
    }
  };

  const getGeneralTicketList = async () => {
    try {
      const response = await authInstance.get('/admin/tickets/general');
      setGeneralTicketList(response.data.result.tickets);
    } catch (error: any) {}
  };

  const getFreshmanTicketList = async () => {
    try {
      const response = await authInstance.get('/admin/tickets/freshman');
      setFreshmanTicketList(response.data.result.tickets);
    } catch (error: any) {}
  };

  useEffect(() => {
    if (type === '신입생') {
      getFreshmanTicketList();
    } else if (type === '일반') {
      getGeneralTicketList();
    } else {
      getAllTicketList();
    }
  }, [type]);

  const copyReservationId = (reservation_id: string) => {
    navigator.clipboard.writeText(reservation_id).then(() => {
      alert('예매번호가 복사되었습니다!');
    });
  };

  const copyPhoneNum = (phone_num: string) => {
    navigator.clipboard.writeText(phone_num).then(() => {
      alert('전화번호가 복사되었습니다!');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {ticketList.map((ticket, index) => (
        <Accordion key={ticket.id}>
          <AccordionSummary
            className="w-[1200px] border-solid border-gray-10 border-b-2 p-0 pr-6"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {ticket.status === 'FINISH_PAYMENT' ? (
              <Typography
                component="div"
                className="min-w-[94px] text-center text-base font-medium text-primary-50"
              >
                결제 완료
              </Typography>
            ) : ticket.status === 'WAIT' ? (
              <Typography
                component="div"
                className="min-w-[94px] text-center text-base font-medium text-gray-30"
              >
                결제 대기
              </Typography>
            ) : ticket.status === 'CANCEL_REQUEST' ? (
              <Typography
                component="div"
                className="min-w-[94px] text-center text-base font-medium text-danger-40"
              >
                취소 요청
              </Typography>
            ) : ticket.status === 'CANCEL_COMPLETE' ? (
              <Typography
                component="div"
                className="min-w-[94px] text-center text-base font-medium text-gray-30"
              >
                예매 취소
              </Typography>
            ) : null}

            <Typography
              component="div"
              className="min-w-[186px] text-center text-base font-medium text-gray-60"
            >
              {ticket.reservation_id}
            </Typography>
            <div
              onClick={() => copyReservationId(ticket.reservation_id)}
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
            <Typography
              component="div"
              className="min-w-[120px] text-center text-base font-medium text-gray-60"
            >
              {ticket.buyer}
            </Typography>
            <Typography
              component="div"
              className="min-w-[160px] text-center text-base font-medium text-gray-60"
            >
              {ticket.phone_num}
            </Typography>
            <div
              onClick={() => copyPhoneNum(ticket.phone_num)}
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
            <Typography
              component="div"
              className="min-w-[120px] text-center text-base font-medium text-gray-60"
            >
              {ticket.total_ticket}장
            </Typography>

            <Typography
              component="div"
              className="min-w-[186px] text-center text-base font-medium text-gray-60"
            >
              {ticket.major === null ? '-' : ticket.major}
            </Typography>

            <Typography
              component="div"
              className="min-w-[120px] text-center text-base font-medium text-gray-60"
            >
              {ticket.studentId === null ? '-' : ticket.studentId}
            </Typography>

            <Typography
              component="div"
              className="min-w-[120px] text-center text-base font-medium text-gray-60"
            >
              {ticket.meeting === null ? '-' : ticket.meeting}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              {members[index] &&
                members[index].map((member) => (
                  <div key={member.id} className="flex items-center pb-3">
                    <div className="text-base font-medium text-gray-60">
                      이름 : {member.name}
                    </div>
                    <div className="text-base ml-14 font-medium text-gray-60">
                      전화번호 : {member.phone_num}
                    </div>
                    <div
                      onClick={() => copyPhoneNum(member.phone_num)}
                      className="ml-4 flex items-center justify-start cursor-pointer"
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
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </ThemeProvider>
  );
};

export default TicketLists;
