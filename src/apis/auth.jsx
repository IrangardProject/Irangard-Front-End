import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../utils/constants';

export const useLogin = () => useMutation(loginData => axios.post(`${baseUrl}/accounts/auth/jwt/create`, loginData));

export const useForgetPass = () => useMutation(email => axios.post(`${baseUrl}/accounts/auth/reset-password/`, email));

export const useSetPassword = () =>
  useMutation(userData => axios.post(`${baseUrl}/accounts/auth/set-password/`, userData));

export const useActivateAccount = () =>
  useMutation(userData => axios.post(`${baseUrl}/accounts/auth/activate/`, userData));

export const useCheckCode = () => useMutation(userData => axios.post(`${baseUrl}/accounts/auth/check-code/`, userData));
