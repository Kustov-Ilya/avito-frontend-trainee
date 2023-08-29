import { Skeleton } from "antd";
import "./game-card.pcss";
import { useEffect, useState } from "react";
import { Game } from "@/store/reducers/games-list-slice";
import { useNavigate } from "react-router-dom";
import stringToRuDate from "@/utils/string-to-ru-date";

export type GameCardType = Partial<Game>;

export default function GameCard(props: GameCardType) {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(props.id!.toString())}>
      <div className="game-card__image-container">
        <img
          src={props.thumbnail}
          alt="Картинка игры"
          className="game-card__image"
        />
      </div>
      <div className="game-card__info-block">
        <h3 className="text-lg-font-medium">{props.title}</h3>
        <div className="game-card__description">
          <p className="text-base-font-regular">{props.developer}</p>
          <p className="text-base-font-regular">{props.genre}</p>
          <p className="text-base-font-regular">
            {stringToRuDate(props.release_date!)}
          </p>
        </div>
      </div>
    </div>
  );
}
