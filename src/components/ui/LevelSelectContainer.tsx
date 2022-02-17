import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { mainBgColor } from '../e-book/cosnstants';

interface LevelSelecContainerProps {
  color?: string;
}

const LevelMainWrapper = styled(Box)`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
`;

const LevelInnerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  border-radius: 2em;
  background-color: #fff;
  min-width: 400px;
`;

// TODO  fix BG color

const LevelSelecContainer: React.FC<LevelSelecContainerProps> = ({
  children,
  color = mainBgColor,
}) => {
  return (
    <LevelMainWrapper color={color}>
      <LevelInnerWrapper>{children}</LevelInnerWrapper>
    </LevelMainWrapper>
  );
};

export default LevelSelecContainer;
