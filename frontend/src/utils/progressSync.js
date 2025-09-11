import { STORAGE_KEYS } from '../constants/gameConstants';
import { axios } from '../api/axios';
import { MODULE_CONFIG } from '../components/MainPage/constants';

export const getLocalProgress = () => {
  try {
    // Получаем текущий уровень из localStorage
    const currentLevelString = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
    const currentLevel = currentLevelString ? parseInt(currentLevelString, 10) : 0;
    
    // Создаем массив завершенных уровней только для бесплатных уровней
    const completedLevels = [];
    for (let level = 1; level <= Math.min(currentLevel, MODULE_CONFIG.freeLevels); level++) {
      completedLevels.push(level);
    }
    
    return completedLevels;
  } catch (error) {
    console.error('Ошибка при получении локального прогресса:', error);
    return [];
  }
};

export const saveLocalProgress = (level) => {
  try {
    const currentLevel = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL) || '0', 10);
    const newLevel = Math.max(currentLevel, level);
    localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, newLevel.toString());
  } catch (error) {
    console.error('Ошибка при сохранении локального прогресса:', error);
  }
};

export const syncLocalProgressWithServer = async () => {
  try {
    const completedLevels = getLocalProgress();
    
    if (completedLevels.length === 0) {
      return { success: true, syncedLevels: [] };
    }
    
    
    // Отправляем каждый завершенный уровень на сервер
    const syncPromises = completedLevels.map(level =>
      axios.post(`/forest/level/${level}/complete`, { 
        score: 3, // Стандартный балл для синхронизированных уровней
        fromLocalSync: true // Флаг, что это синхронизация локального прогресса
      }, { 
        withCredentials: true 
      }).catch(error => {
        console.warn(`Не удалось синхронизировать уровень ${level}:`, error);
        return null;
      })
    );
    
    const results = await Promise.all(syncPromises);
    const syncedLevels = results
      .map((result, index) => result ? completedLevels[index] : null)
      .filter(level => level !== null);
    
    // Очищаем локальный прогресс после успешной синхронизации
    if (syncedLevels.length > 0) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
    }
    
    return {
      success: true,
      syncedLevels,
      failedLevels: completedLevels.filter(level => !syncedLevels.includes(level))
    };
    
  } catch (error) {
    console.error('Ошибка синхронизации прогресса:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const clearLocalProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
  } catch (error) {
    console.error('Ошибка при очистке локального прогресса:', error);
  }
};
