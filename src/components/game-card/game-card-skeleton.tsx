import { Skeleton } from "antd";
import "./game-card.pcss";
import { useEffect, useState } from "react";

export default function GameCardSkeleton() {
  return (
    <div className="game-card">
      <div className="game-card__image-container">
        <Skeleton.Node active className="game-card__skeleton-image">
          <p />
        </Skeleton.Node>
      </div>
      <Skeleton
        active
        title={{ width: 80 }}
        paragraph={{ rows: 3, width: [150, 150, 60] }}
      ></Skeleton>
    </div>
  );
}
