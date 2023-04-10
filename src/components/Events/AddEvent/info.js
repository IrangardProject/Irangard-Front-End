import {
  RiRestaurantLine,
  RiHome3Line,
  RiChatQuoteLine,
  RiShipLine,
  RiPagesLine,
  RiFileList2Fill,
} from 'react-icons/ri';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';
export const AddEventSteps = [
  {
    label: 'اطلاعات پایه',
    icon: RiFileList2Fill,
    fields: ['name', 'description'],
  },
  {
    label: 'نقشه',
    icon: FaMapMarkedAlt,
    fields: ['state', 'city', 'street', 'latitude', 'longitude'],
  },
  {
    label: 'اطلاعات تماس',
    icon: MdContactPhone,
    fields: ['phone', 'email', 'website'],
  },
  {
    label: 'زمان و تاریخ',
    icon: RiPagesLine,
    fields: [],
  },
  {
    label: 'اطلاعات تکمیلی',
    icon: RiPagesLine,
    fields: [],
  },
];
