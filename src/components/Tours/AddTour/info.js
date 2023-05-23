import { RiPagesLine, RiFileList2Fill } from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { FaMapMarkedAlt } from 'react-icons/fa';
export const AddTourSteps = [
  {
    label: 'اطلاعات پایه',
    icon: RiFileList2Fill,
    fields: ['tourName', 'tourPrice', 'tourCapacity', 'tourCategory', 'tourTags'],
  },
  {
    label: 'مکان تور',
    icon: FaMapMarkedAlt,
    fields: ['state', 'city', 'address', 'latitude', 'longitude'],
  },
  {
    label: 'تاریخ تور',
    icon: BsCalendarDate,
    fields: ['startDate', 'endDate'],
  },
  {
    label: 'اطلاعات تکمیلی',
    icon: RiPagesLine,
    fields: ['phoneNumber', 'email', 'summary', 'images'],
  },
];
