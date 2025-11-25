import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../Button/Button';

import {
  Wrapper,
  Modal,
  Block,
  Title,
  Achievement,
  Stars,
  Star1,
  Star2,
  Star3,
  ButtonsWrapper,
} from './styled';

export const LevelScore = ({ isLastLevel, score, onContinue, onClose }) => {
  const navigate = useNavigate();

  const openMenu = () => {
    navigate(`/game`);
  };

  return createPortal(
    <Wrapper>
      <Modal>
        <Stars>
          <Star1 isEmpty={score < 1} />
          <Star2 isEmpty={score < 2} />
          <Star3 isEmpty={score < 3} />
        </Stars>
        <Block>
          <Title>关卡已通关！</Title>
          {score < 3 && <Achievement>若想获得更多星星，需要完成所有任务</Achievement>}
        </Block>

        <ButtonsWrapper>
          {/* 隐藏菜单按钮 */}
          {/* <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
            <span>菜单</span>
          </Button> */}
          {/* 隐藏继续按钮 */}
          {/* {!isLastLevel &&
            <Button frontColor="#40BF4C" shadowColor="#1E9029" onClick={onContinue} height="50" width="100">
              <span>继续</span>
            </Button>
          } */}
          <Button frontColor="#D79D2C" shadowColor="#B47C11" onClick={onClose} height="50" width="100">
            <span>重新开始</span>
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Wrapper>,
    document.body,
  );
};
