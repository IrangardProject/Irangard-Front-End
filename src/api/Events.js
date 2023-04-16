import { useMutation } from 'react-query';
import apiInstance from 'src/config/axios';
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../utils/constants';


export const useAddEvent = () => useMutation(eventData => apiInstance.post(`/events/`, eventData));
export const updateEvent = (eventId, eventData) => apiInstance.put(`/events/${eventId}/`, eventData);
export const useGetEvent = id =>
  useQuery('getEvent', () => axios.get(`${baseUrl}/events/${id}/`).then(res => res.data));
