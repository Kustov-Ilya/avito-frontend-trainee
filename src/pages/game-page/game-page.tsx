import { useNavigate, useParams } from "react-router-dom";
import "./game-page";
import { Carousel, Layout, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { getGameById } from "@/store/reducers/game-page-slice";
import { Status } from "@/types/status-enum";
import CustomButton from "@/components/custom-button/custom-button";

const { Content } = Layout;

export default function GamePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { game: id } = useParams();
  const { game, gameLoadedStatus } = useAppSelector((state) => state.gamePage);

  useEffect(() => {
    //TODO remake
    dispatch(getGameById({ id: +id! }));
  }, []);

  useEffect(() => {
    console.log(game);
  }, [game]);
  return (
    <main>
      {gameLoadedStatus == Status.PENDING ? (
        <Spin/>
      ) : (
        <Content
          style={{
            paddingTop: "64px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <a onClick={()=>navigate(-1)}>Back to the main page</a>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: "fit-content",
                width: "445px",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Carousel>
                {game?.screenshots?.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt="screenshot"
                  />
                ))}
              </Carousel>
              <CustomButton
                label="start the game"
                onClick={() => console.log(game?.game_url)}
              />
            </div>
            <div>
              <h1>{game?.title}</h1>
              <p>
                <span>Release date</span> {game?.release_date}
              </p>
              <p>
                <span>Publisher</span> {game?.publisher}
              </p>
              <p>
                <span>Developer</span> {game?.developer}
              </p>
              <p>
                <span>Genre</span> {game?.genre}
              </p>
              <h2>Minimum requirements</h2>
              <div>
                <p>{game?.minimum_system_requirements?.os}</p>
                <p>{game?.minimum_system_requirements?.processor}</p>
                <p>{game?.minimum_system_requirements?.memory}</p>
                <p>{game?.minimum_system_requirements?.graphics}</p>
                <p>{game?.minimum_system_requirements?.storage}</p>
              </div>
              <p>{game?.description}</p>
            </div>
          </div>
        </Content>
      )}
    </main>
  );
}
