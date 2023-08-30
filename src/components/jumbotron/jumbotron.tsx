import "./jumbotron.pcss";
import CustomButton from "../custom-button/custom-button";
import useCustomNavigate from "@/hooks/use-custom-navigate";

const IMAGE_URL = "https://i.playground.ru/p/VXQPdEE75RxL4W0X6T6PIQ.png";
const GAME_PAGE_URL = "540";

export default function Jumbotron() {
  const customNavigate = useCustomNavigate();

  const onClick = () => customNavigate(GAME_PAGE_URL);
  return (
    <section className="jumbotron">
      <img src={IMAGE_URL} alt="Реклама игры" className="jumbotron__image" />
      <CustomButton onClick={onClick} label="go to the game" />
    </section>
  );
}
