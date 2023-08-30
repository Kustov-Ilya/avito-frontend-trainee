import "./main-page";
import { Layout, List } from "antd";
import GameCard from "@/components/game-card/game-card";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useEffect, useMemo } from "react";
import {
  getGames,
  setGenre,
  setPlatform,
  setSortBy,
} from "@/store/reducers/games-list-slice";
import GameCardSkeleton from "@/components/game-card/game-card-skeleton";
import Jumbotron from "@/components/jumbotron/jumbotron";
import Filters, { FiltersProps } from "@/components/filters/filters";
import {
  genreItems,
  platformItems,
  sortByItems,
} from "@/components/filters/filters-items";
import { Status } from "@/types/status-enum";
import Error from "@/components/error/error";

const { Content } = Layout;
export default function MainPage() {
  const dispatch = useAppDispatch();
  const { platform, genre, sortBy } = useAppSelector(
    (state) => state.gamesList.filters
  );
  const gamesList = useAppSelector((state) => state.gamesList.games);
  const gamesLoadedStatus = useAppSelector(
    (state) => state.gamesList.gamesLoadedStatus
  );
  const isRejectedStatus = useMemo(
    () => gamesLoadedStatus == Status.REJECTED,
    [gamesLoadedStatus]
  );
  const isPendingStatus = useMemo(
    () => gamesLoadedStatus == Status.PENDING,
    [gamesLoadedStatus]
  );

  useEffect(() => {
    dispatch(getGames({ platform, genre, sortBy }));
  }, [platform, genre, sortBy]);

  const filters: FiltersProps["items"] = [
    {
      items: platformItems,
      selectedKey: platform,
      setSelectedKey: (key) => dispatch(setPlatform(key)),
      label: "Platform",
    },
    {
      items: genreItems,
      selectedKey: genre,
      setSelectedKey: (key) => dispatch(setGenre(key)),
      label: "Genre",
    },
    {
      items: sortByItems,
      selectedKey: sortBy,
      setSelectedKey: (key) => dispatch(setSortBy(key)),
      label: "Sort By",
    },
  ];

  return (
    <main>
      <Content
        style={{
          paddingTop: "64px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isRejectedStatus && <Error />}
        {!isRejectedStatus && (
          <div>
            <Jumbotron />
            <Layout style={{ padding: "60px 32px 60px 32px" }}>
              <h2 className="text-xl-font-medium-lg-heigth">
                Personalized Recommendations
              </h2>
              <Filters items={filters} />
              {!gamesList.length && isPendingStatus && (
                <List
                  style={{ alignSelf: "center" }}
                  grid={{
                    gutter: 16,
                  }}
                  dataSource={new Array(12).fill({})}
                  renderItem={() => <GameCardSkeleton />}
                />
              )}
              {gamesList.length && (
                <List
                  style={{ alignSelf: "center" }}
                  grid={{
                    gutter: 16,
                  }}
                  pagination={{
                    pageSize: 12,
                    itemRender: (page, type, element) => {
                      if (type == "page") {
                        return (
                          <a
                            className="text-sm-font-regular"
                            style={{
                              lineHeight: "inherit",
                              color: "var(--white)",
                              backgroundColor: "var(--background-color)",
                              border: "none",
                            }}
                          >
                            {page}
                          </a>
                        );
                      } else {
                        return element;
                      }
                    },
                    align: "center",
                    showSizeChanger: false,
                    onChange: () => {
                      scrollTo(0, 0);
                    },
                  }}
                  dataSource={gamesList}
                  renderItem={(item) => <GameCard {...item} />}
                />
              )}
            </Layout>
          </div>
        )}
      </Content>
    </main>
  );
}
