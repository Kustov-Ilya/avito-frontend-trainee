import { useNavigate } from "react-router-dom";
import "./jumbotron.pcss";
import { Button } from "antd";
import CustomButton from "../custom-button/custom-button";

const IMAGE_URL = "https://i.playground.ru/p/VXQPdEE75RxL4W0X6T6PIQ.png";
const GAME_PAGE_URL = "540";

export default function Jumbotron() {
  const navigate = useNavigate();

  const onClick = () => navigate(GAME_PAGE_URL);
  return (
    <section className="jumbotron">
      <img src={IMAGE_URL} alt="Реклама игры" className="jumbotron__image" />
      <CustomButton onClick={onClick} label="go to the game" />
    </section>
  );
}
