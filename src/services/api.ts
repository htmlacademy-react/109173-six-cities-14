import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://14.design.pages.academy';
const TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  return api;
}
