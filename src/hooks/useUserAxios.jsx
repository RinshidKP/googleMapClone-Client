
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../apiRoutes/routes';
const useUserAxios = () => {
    const { AccessKey,Token, Role } = useSelector((state) => state.User);
    const navigate = useNavigate();
    useEffect(() => {
      // Request interceptor
      const reqInterceptor = (config) => {
        // Modify request configuration, e.g., set headers
        config.headers['Authorization'] = Token;
        config.headers['userRole'] = Role;
        return config;
      }; 
  
      // Response interceptor 
      const resInterceptor = (response) => response;
  
      // Error interceptor
      const errInterceptor = (error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(error);
      };
  
      const reqInterceptorId = userAPI.interceptors.request.use(reqInterceptor);
      const resInterceptorId = userAPI.interceptors.response.use(resInterceptor, errInterceptor);
  
      // Clean up interceptors on component unmount
      return () => {
        userAPI.interceptors.request.eject(reqInterceptorId);
        userAPI.interceptors.response.eject(resInterceptorId);
      };
    }, []);
  
    return userAPI
  };
  
  export default userAPI;

export { useUserAxios}
