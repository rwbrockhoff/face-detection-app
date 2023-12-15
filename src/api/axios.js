import axios from 'axios';

export const faceDetectionAPI = axios.create({
  baseURL: 'http://localhost:3001',
});
