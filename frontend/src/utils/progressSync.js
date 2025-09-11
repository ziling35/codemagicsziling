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
    
    console.log('Найден локальный прогресс:', completedLevels);
    
    // Формируем массив уровней для синхронизации
    const levelsToSync = completedLevels.map(levelId => ({
      levelId,
      score: 3 // Стандартный балл для синхронизированных уровней
    }));
    
    // Отправляем один запрос для синхронизации всех уровней
    const response = await axios.post('/user/forest/levels/sync', {
      levels: levelsToSync
    }, { 
      withCredentials: true 
    });
    
    if (response.data && response.data.success) {
      console.log('Успешно синхронизировано уровней:', response.data.syncedCount);
      
      // Очищаем локальный прогресс после успешной синхронизации
      localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
      
      return {
        success: true,
        syncedLevels: completedLevels,
        failedLevels: []
      };
    }
    
    return {
      success: false,
      error: 'Неожиданный ответ сервера'
    };
    
  } catch (error) {
    console.error('Ошибка синхронизации прогресса:', error);
    return {
      success: false,
      error: error.message,
      syncedLevels: [],
      failedLevels: getLocalProgress()
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
