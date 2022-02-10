import React, { FC } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthBarProps {
  color: string;
}

const HealthBar: FC<HealthBarProps> = ({ color }) => {
  const TOTAL_HP = 5;
  const healthPoints = 3;

  const getHpStatus = (): ReactJSXElement[] => {
    const hpElements: ReactJSXElement[] = [];

    for (let i = 0; i < TOTAL_HP; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      i <= healthPoints - 1
        ? hpElements.push(
            <FavoriteIcon fontSize="large" sx={{ fill: color }} />
          )
        : hpElements.push(
            <FavoriteBorderIcon fontSize="large" sx={{ fill: color }} />
          );
    }
    return hpElements;
  };

  const healthStatus = getHpStatus();

  return <span>{healthStatus}</span>;
};

export default HealthBar;
