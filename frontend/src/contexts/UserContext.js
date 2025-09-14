import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { axios } from '../api/axios';
import { STORAGE_KEYS } from '../constants/game';
import { syncLocalProgressWithServer } from '../utils/progressSync';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = () => {
    return !!Cookies.get(STORAGE_KEYS.authToken);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        try {
          const response = await axios.get('/user', { withCredentials: true });
          await updateUserWithSync(response.data);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove(STORAGE_KEYS.authToken, { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN, secure: true, sameSite: 'Lax' });
    setUser(null);
  };

  const updateUserWithSync = async (newUser) => {
    // 如果用户是首次（或重新）登录
    if (newUser && !user) {
      try {
        // 将本地进度与服务器同步
        const syncResult = await syncLocalProgressWithServer();
        console.log('进度同步结果:', syncResult);
        
        if (syncResult.success && syncResult.syncedLevels.length > 0) {
          console.log(`已同步 ${syncResult.syncedLevels.length} 个关卡`);
        }
      } catch (error) {
        console.error('同步进度时出错:', error);
      }
    }
    
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      updateUserWithSync,
      logout,
      isLoading,
      isAuthenticated: isAuthenticated()
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 