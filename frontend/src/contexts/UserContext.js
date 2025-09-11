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
    Cookies.remove(STORAGE_KEYS.authToken, { path: '/', domain: '.codemagics.ru', secure: true, sameSite: 'Lax' });
    setUser(null);
  };

  const updateUserWithSync = async (newUser) => {
    // Если пользователь входит в систему впервые (или заново)
    if (newUser && !user) {
      try {
        // Синхронизируем локальный прогресс с сервером
        const syncResult = await syncLocalProgressWithServer();
        console.log('Результат синхронизации прогресса:', syncResult);
        
        if (syncResult.success && syncResult.syncedLevels.length > 0) {
          console.log(`Синхронизировано ${syncResult.syncedLevels.length} уровней`);
        }
      } catch (error) {
        console.error('Ошибка при синхронизации прогресса:', error);
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