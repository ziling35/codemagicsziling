import { STORAGE_KEYS } from '../constants/gameConstants';
import { axios } from '../api/axios';
import { MODULE_CONFIG } from '../components/MainPage/constants';

export const getLocalProgress = () => {
  try {
    // 从 localStorage 获取当前关卡
    const currentLevelString = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
    const currentLevel = currentLevelString ? parseInt(currentLevelString, 10) : 0;
    
    // 仅为免费关卡创建已完成关卡数组
    const completedLevels = [];
    for (let level = 1; level <= Math.min(currentLevel, MODULE_CONFIG.freeLevels); level++) {
      completedLevels.push(level);
    }
    
    return completedLevels;
  } catch (error) {
    console.error('获取本地进度时出错:', error);
    return [];
  }
};

export const saveLocalProgress = (level) => {
  try {
    const currentLevel = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL) || '0', 10);
    const newLevel = Math.max(currentLevel, level);
    localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, newLevel.toString());
  } catch (error) {
    console.error('保存本地进度时出错:', error);
  }
};

export const syncLocalProgressWithServer = async () => {
  try {
    const completedLevels = getLocalProgress();
    
    if (completedLevels.length === 0) {
      return { success: true, syncedLevels: [] };
    }
    
    console.log('发现本地进度:', completedLevels);
    
    // 生成用于同步的关卡数组
    const levelsToSync = completedLevels.map(levelId => ({
      levelId,
      score: 3 // Стандартный балл для синхронизированных уровней
    }));
    
    // 发送单个请求以同步所有关卡
    const response = await axios.post('/user/forest/levels/sync', {
      levels: levelsToSync
    }, { 
      withCredentials: true 
    });
    
    if (response.data && response.data.success) {
      console.log('成功同步的关卡数:', response.data.syncedCount);
      
      // 同步成功后清除本地进度
      localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
      
      return {
        success: true,
        syncedLevels: completedLevels,
        failedLevels: []
      };
    }
    
    return {
      success: false,
      error: '服务器返回了意外的响应'
    };
    
  } catch (error) {
    console.error('同步进度时出错:', error);
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
    console.error('清除本地进度时出错:', error);
  }
};
