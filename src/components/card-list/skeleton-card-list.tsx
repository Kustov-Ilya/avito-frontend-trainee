import './card-list.pcss';
import { List } from 'antd';
import { FC } from 'react';
import GameCardSkeleton from '../game-card/game-card-skeleton';

const SkeletonCardList: FC = () => (
  <List
    className="card-list"
    grid={{
      gutter: 16,
    }}
    dataSource={new Array(12).fill({})}
    renderItem={() => <GameCardSkeleton/>}
  />
);

export default SkeletonCardList;
