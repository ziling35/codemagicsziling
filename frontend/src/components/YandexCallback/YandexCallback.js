import React, { useEffect } from 'react';

export const YandexCallback = () => {
  useEffect(() => {
    if (window.YaSendSuggestToken) {
      window.YaSendSuggestToken(
        process.env.REACT_APP_YA_BASE_URL, 
        {
          flag: true
        }
      );
    }
  }, []);

  return (<div></div>)
}