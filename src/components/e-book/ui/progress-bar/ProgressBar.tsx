import React, { FC } from 'react';
import { Box, Tooltip } from '@mui/material';
import {
  MAX_PROGRESS_ITEMS,
  EMPTY_ITEM_COLOR,
  MIN_PROGRESS_ITEMS,
} from '../../cosnstants';

interface ProgressBarProps {
  color: string;
  progress: number;
  isDifficult: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({
  color,
  progress,
  isDifficult,
}) => {
  const progressItems = () => {
    const items: JSX.Element[] = [];
    const itemsNum = isDifficult ? MAX_PROGRESS_ITEMS : MIN_PROGRESS_ITEMS;

    for (let i = 0; i < itemsNum; i += 1) {
      items.push(
        <Box
          key={i}
          sx={{
            backgroundColor: i < progress ? color : EMPTY_ITEM_COLOR,
            width: '1em',
            height: '0.2em',
          }}
        />
      );
    }
    return items;
  };

  return (
    <Tooltip title="Your correct answers in a row in games">
      <Box
        sx={{
          display: 'flex',
          columnGap: '0.2em',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          ml: 'auto',
        }}
      >
        {progressItems()}
      </Box>
    </Tooltip>
  );
};

export default ProgressBar;
