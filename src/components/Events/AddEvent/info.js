import {
  RiRestaurantLine,
  RiHome3Line,
  RiChatQuoteLine,
  RiShipLine,
  RiPagesLine,
  RiFileList2Fill,
} from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';
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

export const eventTypes = [
  { label: 'همایش', value: 'conference' },
  { label: 'نمایشگاه', value: 'exhibition' },
  { label: 'نمایش', value: 'show' },
  { label: 'کنسرت یا اجرا', value: 'concert or performance' },
  { label: 'جشنواره', value: 'festival' },
  { label: 'مسابقه', value: 'competition' },
  { label: 'کنفرانس', value: 'conference' },
  { label: 'سمینار', value: 'seminar' },
  { label: 'مجمع', value: 'convention' },
  { label: 'جشن', value: 'gala' },
  { label: 'مراسم', value: 'ceremony' },
  { label: 'سایر', value: 'other' },
];

export const eventCategories = [
  { label: 'هنری', value: 'art' },
  { label: 'علمی', value: 'science' },
  { label: 'فرهنگی', value: 'culture' },
  { label: 'ورزشی', value: 'sport' },
  { label: 'سیاسی', value: 'politics' },
  { label: 'اجتماعی', value: 'social' },
  { label: 'مذهبی', value: 'religion' },
  { label: 'تجاری', value: 'business' },
  { label: 'سایر', value: 'other' },
];
