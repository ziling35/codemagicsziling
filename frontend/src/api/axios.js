import axios from 'axios';

// 调试：打印 API Host
console.log('🔍 API Host:', process.env.REACT_APP_API_HOST);

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export { instance as axios };
