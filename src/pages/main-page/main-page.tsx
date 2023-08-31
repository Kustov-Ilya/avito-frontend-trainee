import './main-page.pcss';
import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import { FC, useEffect, useMemo } from 'react';
import {
  getGames,
  setGenre,
  setPlatform,
  setSortBy,
} from '@/reducers/games-list-slice';
import Jumbotron from '@/components/jumbotron/jumbotron';
import Filters, { FiltersProps } from '@/components/filters/filters';
import {
  genreItems,
  platformItems,
  sortByItems,
} from '@/constants/filters-items';
import { Status } from '@/constants/status';
import Error from '@/components/error/error';
import { Content } from 'antd/es/layout/layout';
import SkeletonCardList from '@/components/card-list/skeleton-card-list';
import CardList from '@/components/card-list/card-list';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { platform, genre, sortBy } = useAppSelector(
    (state) => state.gamesList.filters,
  );
  const gamesList = useAppSelector((state) => state.gamesList.games);
  const gamesLoadedStatus = useAppSelector(
    (state) => state.gamesList.gamesLoadedStatus,
  );
  const isRejectedStatus = useMemo(
    () => gamesLoadedStatus == Status.REJECTED,
    [gamesLoadedStatus],
  );
  const isPendingStatus = useMemo(
    () => gamesLoadedStatus == Status.PENDING,
    [gamesLoadedStatus],
  );

  useEffect(() => {
    dispatch(getGames({ platform, genre, sortBy }));
  }, [platform, genre, sortBy]);

  const filters: FiltersProps['items'] = [
    {
      items: platformItems,
      selectedKey: platform,
      setSelectedKey: (key) => dispatch(setPlatform(key)),
      label: 'Platform',
    },
    {
      items: genreItems,
      selectedKey: genre,
      setSelectedKey: (key) => dispatch(setGenre(key)),
      label: 'Genre',
    },
    {
      items: sortByItems,
      selectedKey: sortBy,
      setSelectedKey: (key) => dispatch(setSortBy(key)),
      label: 'Sort By',
    },
  ];

  return (
    <main>
      <Content className="main-page">
        {isRejectedStatus && <Error/>}
        {!isRejectedStatus && (
          <div>
            <Jumbotron/>
            <Layout className="main-page__games">
              <h2 className="text-xl-font-medium-lg-heigth">
                Personalized Recommendations
              </h2>
              <Filters items={filters}/>
              {!gamesList.length && isPendingStatus && <SkeletonCardList/>}
              {!!gamesList.length && <CardList gamesList={gamesList}/>}
            </Layout>
          </div>
        )}
      </Content>
    </main>
  );
};

export default MainPage;
