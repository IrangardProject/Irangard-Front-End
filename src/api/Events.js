import { useMutation } from 'react-query';
import apiInstance from 'src/config/axios';

export const useAddEvent = () => useMutation(eventData => apiInstance.post(`/events/`, eventData));
export const updateEvent = (eventId, eventData) => apiInstance.put(`/event/${eventId}/`, eventData);
