import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface TicketInfo {
  name: string;
  price: string;
  maxQuantity: number;
}

interface Tickets {
  freshman: TicketInfo;
  general: TicketInfo;
}

interface Information {
  title: string;
  location: string;
  locationDetails: string;
  dateForString: string;
  dateForMinute: string;
  dayForString: string;
  subDate: string;
  eventDate: Date;
  lastReserveDate: Date;
  isFreshmanFree: boolean;
  isDays: boolean;
  tickets: Tickets;
  day: string;
  time: string;
}

const formatDateForString = (date: Date): string =>
  dayjs(date).tz().format('YYYY년 M월 D일 H시');

const formatDayForString = (date: Date): string =>
  dayjs(date).tz().format('YYYY.MM.DD');

const formatDay = (date: Date): string =>
  dayjs(date).tz().format('YYYY년 M월 D일');

const formatTime = (date: Date): string => dayjs(date).tz().format('H시 mm분');

const formatDateForMinute = (date: Date): string =>
  dayjs(date).tz().format('YYYY년 M월 D일 H시 mm분');

const formatSubDate = (date: Date): string => {
  const dayOfWeek = dayjs(date).tz().format('ddd').toUpperCase();
  return `${dayjs(date).tz().format('YYYY.MM.DD')} ${dayOfWeek} ${dayjs(date).tz().format('H:mm')}`;
};

const createEventDates = (
  eventDateString: string,
  reserveDateString: string
): { eventDate: Date; lastReserveDate: Date } => {
  return {
    eventDate: new Date(eventDateString),
    lastReserveDate: new Date(reserveDateString),
  };
};

const dynamicEventDateString = '2024-09-02T19:00:00+09:00';
const dynamicLastReserveDateString = '2024-09-01T19:00:00+09:00';

const { eventDate, lastReserveDate } = createEventDates(
  dynamicEventDateString,
  dynamicLastReserveDateString
);

const getInformation = (): Information => {
  const nowKoreanTime = dayjs().tz('Asia/Seoul').toDate();
  const isDays = true;

  return {
    title: '2024년 9월 정기 공연',
    location: '001 클럽',
    locationDetails: '서울 마포구 와우산로18길 20 지하 1층',
    dateForString: formatDateForString(eventDate),
    dateForMinute: formatDateForMinute(eventDate),
    dayForString: formatDayForString(lastReserveDate),
    day: formatDay(eventDate),
    time: formatTime(eventDate),
    subDate: formatSubDate(eventDate),
    eventDate: eventDate,
    lastReserveDate: lastReserveDate,
    isFreshmanFree: false,
    isDays: isDays,
    tickets: {
      freshman: {
        name: '신입생 티켓',
        price: '무료',
        maxQuantity: 1,
      },
      general: {
        name: '일반 티켓',
        price: '5,000원',
        maxQuantity: 5,
      },
    },
  };
};

export const information = getInformation();
