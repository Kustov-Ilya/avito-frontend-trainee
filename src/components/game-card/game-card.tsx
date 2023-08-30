import "./game-card.pcss";
import stringToRuDate from "@/utils/string-to-ru-date";
import useCustomNavigate from "@/hooks/use-custom-navigate";
import { Game } from "@/store/reducers/game-page-slice";

export type GameCardType = Partial<Game>;

export default function GameCard(props: GameCardType) {
  const customNavigate = useCustomNavigate();

  return (
    <div
      className="game-card"
      onClick={() => customNavigate(props.id!.toString())}
    >
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
