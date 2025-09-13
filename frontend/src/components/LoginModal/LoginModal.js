import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';
import { useUser } from '../../contexts/UserContext';
import { Modal, Wrapper, Top, CloseButton, Title, YaLoginButton } from './styled';

export const LoginModal = ({ onClose, onSuccess, title = 'Вход', canClose = true }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { updateUserWithSync } = useUser();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200); // Match animation duration
  };

  useEffect(() => {
    const params = {
      client_id: process.env.REACT_APP_YA_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_YA_REDIRECT_URI
    };

    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        process.env.REACT_APP_YA_BASE_URL,
        {
          view: 'button',
          parentId: "yaButtonContainerId",
          buttonSize: 'l',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonBorderRadius: '24',
          buttonIcon: 'ya',
        }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN, secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(async (response) => {
            // Используем updateUserWithSync для синхронизации локального прогресса
            if (response.data) {
              await updateUserWithSync(response.data);
            }
            
            if (onSuccess) {
              onSuccess();
            } else {
              location.reload();
            }
          });
      })
      .catch(error => console.log('Обработка ошибки', error))
    }
  }, [onSuccess]);

  return (
    <Wrapper isClosing={isClosing}>
      <Modal>
        <Top>
          <Title>{title}</Title>
          {canClose && (<CloseButton onClick={handleClose}>
            ×
          </CloseButton>)}
        </Top>
        <YaLoginButton id="yaButtonContainerId" />
      </Modal>
    </Wrapper>
  )
}