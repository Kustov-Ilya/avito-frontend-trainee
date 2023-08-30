/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import './game-page.pcss';
import { Carousel, Layout, Spin } from 'antd';
import CustomButton from '@/components/custom-button/custom-button';
import useGameSelector from '@/hooks/use-game-selector';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store';
import { Status } from '@/constants/status';
import { FC, useCallback, useMemo } from 'react';
import Error from '@/components/error/error';
import useCustomNavigate from '@/hooks/use-custom-navigate';
import GameInfoRow from '@/components/game-info-row/game-info-row';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin/>;

const GamePage: FC = () => {
  const customNavigate = useCustomNavigate();
  const { gameId } = useParams();
  const { gameLoadedStatus } = useAppSelector((state) => state.gamePage);
  const isRejectedStatus = useMemo(
    () => gameLoadedStatus == Status.REJECTED,
    [gameLoadedStatus],
  );
  const isPendingStatus = useMemo(
    () => gameLoadedStatus == Status.PENDING,
    [gameLoadedStatus],
  );
  const game = useGameSelector(gameId as string);
  const onClick = useCallback(() => {
    if (game) window.location.href = game?.game_url;
  }, [game]);

  return (
    <main>
      <Content className="game-page">
        <div>
          <a
            className="text-base-font-regular game-page__back"
            onClick={() => customNavigate('/')}
          >
            <ArrowLeftOutlined/>
            Back to the main page
          </a>
        </div>
        {isRejectedStatus && <Error/>}
        {!game && isPendingStatus && <Spin indicator={antIcon}/>}
        {game && (
          <div className="game-page__container">
            <div className="game-page__images-part">
              <div className="game-page__thumbnail">
                <img
                  className="game-page__thumbnail-img"
                  src={game?.thumbnail}
                  alt="thumbnail"
                />
                <CustomButton label="start the game" onClick={onClick}/>
              </div>
              <Carousel autoplay>
                {game?.screenshots?.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt="screenshot"
                  />
                ))}
              </Carousel>
            </div>
            <div className="game-page__info-part">
              <h1 className="text-xl-font-medium">{game?.title}</h1>
              <div className="text-base-font-regular-lg-heigth game-page__game-info">
                <GameInfoRow label="Release date" value={game?.release_date}/>
                <GameInfoRow label="Publisher" value={game?.publisher}/>
                <GameInfoRow label="Developer" value={game?.developer}/>
                <GameInfoRow label="Genre" value={game?.genre}/>
              </div>
              <div className="game-page__min-req-block">
                <h2 className="text-lg-font-medium-lg-heigth">
                  Minimum requirements
                </h2>
                <ul className="text-base-font-regular-lg-heigth game-page__min-req-list">
                  <li>{game?.minimum_system_requirements?.os}</li>
                  <li>{game?.minimum_system_requirements?.processor}</li>
                  <li>{game?.minimum_system_requirements?.memory}</li>
                  <li>{game?.minimum_system_requirements?.graphics}</li>
                  <li>{game?.minimum_system_requirements?.storage}</li>
                </ul>
                <p className="text-base-font-regular-lg-heigth">
                  {game?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </Content>
    </main>
  );
};

export default GamePage;
