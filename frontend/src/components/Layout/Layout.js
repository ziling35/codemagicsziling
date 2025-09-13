import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import Cookies from 'js-cookie';
import { axios } from '../../api/axios';
import { LoginModal } from '../LoginModal/LoginModal';

const LayoutWrapper = styled.div`
`

export const Layout = ({ children, isHeaderTransparent = false, showAutoLogin = true, isGamePage = false }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!showAutoLogin) return;

    const params = {
      client_id: process.env.REACT_APP_YA_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_YA_REDIRECT_URI
    };

    if (!document.cookie.includes('yaToken') && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        params,
        process.env.REACT_APP_YA_BASE_URL,
        { view: "default" }
      )
      .then(({handler}) => handler())
      .then(data => {
        Cookies.set('yaToken', data.access_token, { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN, secure: true, sameSite: 'Lax', expires: Math.floor(Number(data.expires_in) / 86400) })
        axios.post(`/user`, {}, { withCredentials: true })
          .then(() => location.reload());
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, [showAutoLogin]);

  return (
    <LayoutWrapper>
      <Header
        rightButtonText={isGamePage ? 'Войти' : 'Начать программировать'}
        onRightButtonClick={isGamePage ? () => setShowLoginModal(true) : () => navigate('/game')}
        isTransparent={isHeaderTransparent}
      />
      {children}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)}/>}
    </LayoutWrapper>
  )
}