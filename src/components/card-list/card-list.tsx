import './card-list.pcss';
import { List } from 'antd';
import { FC } from 'react';
import GameCard from '../game-card/game-card';
import { Game } from '@/types/game';

type CardListType = {
  gamesList: Game[];
};

const CardList: FC<CardListType> = ({ gamesList }) => (
  <List
    className="card-list"
    grid={{
      gutter: 16,
    }}
    pagination={{
      pageSize: 12,
      itemRender: (page, type, element) => {
        if (type == 'page') {
          return (
            <a
              className="text-sm-font-regular"
              style={{
                lineHeight: 'inherit',
                color: 'var(--white)',
                backgroundColor: 'var(--background-color)',
                border: 'none',
              }}
            >
              {page}
            </a>
          );
        } else {
          return element;
        }
      },
      align: 'center',
      showSizeChanger: false,
      onChange: () => {
        scrollTo(0, 0);
      },
    }}
    dataSource={gamesList}
    renderItem={(item) => <GameCard {...item}/>}
  />
);

export default CardList;
