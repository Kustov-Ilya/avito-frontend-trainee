import { FC } from 'react';
import './game-info-row.pcss';

type GameInfoRowType = {
  label: string;
  value: string;
};

const GameInfoRow: FC<GameInfoRowType> = ({ label, value }) => (
  <p className="game-info-row">
    <span className="game-info-row__title">{label}</span>
    <span>{value}</span>
  </p>
);

export default GameInfoRow;
