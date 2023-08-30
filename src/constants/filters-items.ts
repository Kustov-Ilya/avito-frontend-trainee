import { ItemsType } from '../components/custom-dropdown/custom-dropdown';

export const platformItems: ItemsType = [
  { key: 'pc', label: 'Windows (PC)' },
  { key: 'browser', label: 'Browser (Web)' },
  { key: '', label: 'All Platforms' },
];

export const genreItems: ItemsType = [
  { key: 'mmo', label: 'MMO' },
  { key: 'mmorpg', label: 'MMORPG' },
  { key: 'shooter', label: 'Shooter' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'moba', label: 'Moba' },
  { key: 'card', label: 'Card Games' },
  { key: 'racing', label: 'Racing' },
  { key: 'sports', label: 'Sports' },
  { key: 'social', label: 'Social' },
  { key: 'fighting', label: 'Fighting' },
  { key: '', label: 'All genres' },
];

export const sortByItems: ItemsType = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'popularity', label: 'Popularity' },
  { key: 'release-date', label: 'Release Date' },
  { key: 'alphabetical', label: 'Alphabetical' },
];
