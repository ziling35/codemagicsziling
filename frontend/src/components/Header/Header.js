import React from 'react';
import { HeaderContent, Logo } from './styled';
import { MiniProfile } from '../MiniProfile/MiniProfile';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ActionButton } from '../ActionButton/ActionButton';

export const Header = ({ rightButtonText, onRightButtonClick,  isTransparent }) => {
  const { user, logout } = useUser();

  return (
    <HeaderContent isTransparent={isTransparent}>
      <Link to={user ? '/game' : '/'}>
        <Logo src={'/logo.webp'} alt="App Logo" isTransparent={isTransparent} />
      </Link>
      {!!user && (
        <MiniProfile user={user} onLogout={logout} />
      )}
      {!user && (
        <ActionButton onClick={onRightButtonClick}>
          {rightButtonText}
        </ActionButton>
      )}
    </HeaderContent>
  );
}