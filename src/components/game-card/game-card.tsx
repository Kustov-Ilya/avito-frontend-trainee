import './game-card.pcss';
import stringToRuDate from '@/utils/string-to-ru-date';
import useCustomNavigate from '@/hooks/use-custom-navigate';
import { Game } from '@/types/game';
import { FC, MouseEventHandler, useCallback } from 'react';

export type GameCardType = Game;

const GameCard: FC<GameCardType> = ({
  id,
  thumbnail,
  title,
  developer,
  genre,
  release_date,
}) => {
  const customNavigate = useCustomNavigate();
  const onClick: MouseEventHandler<HTMLElement> = useCallback(
    () => customNavigate(id.toString()),
    [id],
  );

  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-card__image-container">
        <img src={thumbnail} alt="Картинка игры" className="game-card__image"/>
      </div>
      <div className="game-card__info-block">
        <h3 className="text-lg-font-medium">{title}</h3>
        <div className="game-card__description">
          <p className="text-base-font-regular">{developer}</p>
          <p className="text-base-font-regular">{genre}</p>
          <p className="text-base-font-regular">
            {stringToRuDate(release_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
