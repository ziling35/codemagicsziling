import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Wrapper, Top, Title, StyledLink } from './styled';
import { Button } from '../Button/Button';

export const UnavailableLevelModal = ({ dontHaveAccess = false }) => {
  const navigate = useNavigate();

  const openMenu = () => {
    navigate(`/game`);
  };

  return (
    <Wrapper>
      <Modal>
        <Top>
          <Title>关卡不可用</Title>
        </Top>
        {!dontHaveAccess && (<>
          请先完成前置关卡
          {/* <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
            <span>菜单</span>
          </Button> */}
        </>)}
        {dontHaveAccess && (<StyledLink>
          你已通关所有免费关卡。若需访问其余关卡，请在 Telegram 联系 <a href={"https://t.me/reacheight"}>@reacheight</a>。
        </StyledLink>)}
      </Modal>
    </Wrapper>
  );
}