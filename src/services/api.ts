import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

const BASE_URL = 'https://14.design.pages.academy';
const TIMEOUT = 5000;
const ERROR_TEXT = {
  NOT_AUTHORIZED: 'You aren`t authorized',
};

const StatusCodesMap = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
  StatusCodes.BAD_GATEWAY
];

type DetailMessage = {
  property: string;
  value: string;
  messages: string[];
}

type ErrorMessage = {
  type: string;
  message: string;
  details: DetailMessage[];
};

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (request) => {
      const token = getToken();

      if(token) {
        request.headers['X-Token'] = token;
      }

      return request;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if(error.response && StatusCodesMap.includes(error.response.status)) {
        const { data } = error.response;
        const { message, details } = data;

        let messageText = message;

        if(message) {
          switch(error.response.status) {
            case StatusCodes.UNAUTHORIZED: {
              messageText = ERROR_TEXT.NOT_AUTHORIZED;
              break;
            }
          }

          toast.warn(messageText);
        }

        if(details && details.length > 0) {
          details.forEach((detail) => {
            if(detail.messages) {
              detail.messages.forEach((item) => toast.warn(item));
            }
          });
        }
      }

      throw error;
    }
  );

  return api;
}
