import React, { FC } from 'react';
import { Box } from '@mui/material';

interface ProgressBarProps {
  color: string;
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ color, progress }) => {
  const MAX_PROGRESS_ITEMS = 5;
  const EMPTY_ITEM_COLOR = '#d7ccc8';

  const progressItems = () => {
    const items: JSX.Element[] = [];

    for (let i = 0; i < MAX_PROGRESS_ITEMS; i += 1) {
      items.push(
        <Box
          sx={{
            backgroundColor: i <= progress ? color : EMPTY_ITEM_COLOR,
            width: '1em',
            height: '0.2em',
          }}
        />
      );
    }
    return items;
  };

  return (
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
  );
};

export default ProgressBar;
