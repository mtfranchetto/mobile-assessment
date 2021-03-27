import axios from 'axios';
import { HTTPClient } from './HttpClient';

const axiosClient = axios.create({
  /**
   * in the real world baseURL should be read from an environment file
   * since it will differ from dev/prod environments
   * using `react-native-config` or similar
   */
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 20000,
});

export const httpClient = new HTTPClient(axiosClient);
