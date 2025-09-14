import { useState, useEffect, useCallback } from 'react';
import { axios } from '../api/axios';
import { API_ENDPOINTS } from '../constants/game';
import { STORAGE_KEYS } from '../constants/gameConstants';
import { useUser } from '../contexts/UserContext';

export const useGameData = () => {
  const [userLevels, setUserLevels] = useState([]);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useUser();

  const fetchLevels = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.userLevels, { 
        withCredentials: true 
      });
      
      if (response.data) {
        setUserLevels(response.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        const currentAnonymousLevel = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL) ?? 0;
        const anonymousLevels = Array.from(
          { length: parseInt(currentAnonymousLevel, 10) }, 
          (_, i) => ({ levelId: i + 1 })
        );
        setUserLevels(anonymousLevels);
      } else {
        console.error('Failed to fetch user levels:', err);
        setError('无法加载用户进度');
      }
    }
  }, []);

  const fetchGame = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.gameData, { 
        withCredentials: true 
      });
      setGame(response.data);
    } catch (err) {
      console.error('Failed to fetch game data:', err);
      setError('无法加载游戏数据');
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await Promise.all([fetchLevels(), fetchGame()]);
      } catch (err) {
        console.error('Failed to initialize game data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [fetchLevels, fetchGame]);

  const completedLevelsCount = userLevels?.length ?? 0;
  const currentLevel = completedLevelsCount + 1;
  
  const isLevelCompleted = useCallback((level) => {
    return userLevels.some((l) => l.levelId === level);
  }, [userLevels]);

  const isLevelAvailable = useCallback((level) => {
    return currentLevel >= level;
  }, [currentLevel]);

  const isLevelCurrent = useCallback((level) => {
    return currentLevel === level;
  }, [currentLevel]);

  return {
    userLevels,
    game,
    completedLevelsCount,
    currentLevel,
    
    isLoading,
    error,
    isAuthenticated,
    
    isLevelCompleted,
    isLevelAvailable,
    isLevelCurrent,
    
    refetchData: () => Promise.all([fetchLevels(), fetchGame()])
  };
}; 