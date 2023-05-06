import {
  RiPagesLine,
  RiFileList2Fill,
} from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { FaMapMarkedAlt } from 'react-icons/fa';
export const AddEventSteps = [
  {
    label: 'اطلاعات پایه',
    icon: RiFileList2Fill,
    fields: ['name', 'organizer', 'eventType', 'eventCategory', 'eventTags'],
  },
  {
    label: 'مکان رویداد',
    icon: FaMapMarkedAlt,
    fields: ['state', 'city', 'address', 'latitude', 'longitude'],
  },
  {
    label: 'زمان و تاریخ',
    icon: BsCalendarDate,
    fields: ['startDate', 'endDate', 'startTime', 'endTime'],
  },
  {
    label: 'اطلاعات تکمیلی',
    icon: RiPagesLine,
    fields: ['isFree', 'summary', 'images'],
  },
];
