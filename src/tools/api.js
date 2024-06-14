import axios from 'axios';

   const axiosInstance = axios.create({
     baseURL: 'https://api.example.com',
     timeout: 5000, // Timeout if necessary
     header: {
       "Content-Type": "application/json",
       // Add all custom headers here
     },
   });

   export const fetchData = async ( url , options = {}) => {
     try {
       const response = await axiosInstance.get(url, options);
       return response.data;
     } catch (error) {
       console.error('Error retrieving data:', error);
       throw new Error('Could not get data');
     }
   };