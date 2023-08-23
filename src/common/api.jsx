
// import axios from 'axios';

// const BASE_URL = 'https://api.example.com'; // Replace with our API base URL

// const instance = axios.create({
//   baseURL: BASE_URL,
// });

// export const login = async (username, password) => {
//   try {
//     const response = await instance.post('/login', { username, password });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signUp = async (userData) => {
//   try {
//     const response = await instance.post('/signup', userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };





// Mock login function
export const login = async (username, password) => {
    console.log('Mock API: Sending login request with username:', username, 'and password:', password);
  
    // Simulate login by returning mock data
    return { username, token: "mock-token" };
  };
  
  // Mock signup function
  export const signUp = async (userData) => {
    console.log('Mock API: Sending signup request with data:', userData);
  
    // Simulate signup by returning mock data
    return { ...userData, id: "mock-id" };
  };
  
