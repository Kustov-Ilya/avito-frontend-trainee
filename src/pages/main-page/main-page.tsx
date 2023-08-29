import "./main-page";
import { Layout, List, Space } from "antd";
import GameCard from "@/components/game-card/game-card";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useEffect } from "react";
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
        <Jumbotron />
        <Layout style={{ padding: "60px 32px 60px 32px" }}>
          <h2 className="text-2-xl-font-medium">
            Personalized Recommendations
          </h2>
          <Filters items={filters} />
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4,
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
            dataSource={
              gamesLoadedStatus == Status.PENDING
                ? new Array(12).fill({})
                : gamesList
            }
            renderItem={(item) =>
              gamesLoadedStatus == Status.PENDING ? (
                <GameCardSkeleton />
              ) : (
                <GameCard {...item} />
              )
            }
          ></List>
        </Layout>
      </Content>
    </main>
  );
}
