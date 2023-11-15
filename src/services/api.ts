import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = 'https://14.design.pages.academy';
const TIMEOUT = 5000;

const StatusCodesMap = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
  StatusCodes.BAD_GATEWAY
];

type ErrorMessage = {
  type: string;
  message: string;
};

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if(error.response && StatusCodesMap.includes(error.response.status)) {
        const { data } = error.response;
        const { message } = data;

        if(message) {
          toast.warn(message);
        }
      }

      throw error;
    }
  );

  return api;
}
