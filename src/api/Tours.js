import { useMutation } from 'react-query';
import apiInstance from 'src/config/axios';
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../utils/constants';


export const useAddTour = () => useMutation(tourData => apiInstance.post(`/tours/`, tourData));
export const updateTour = (tourId, tourData) => apiInstance.put(`/tours/${tourId}/`, tourData);
export const useGetTour = id =>
  useQuery('getTour', () => axios.get(`${baseUrl}/tours/${id}/`).then(res => res.data));
