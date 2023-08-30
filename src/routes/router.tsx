import App from '@/App';
import GamePage from '@/pages/game-page/game-page';
import MainPage from '@/pages/main-page/main-page';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/',
        element: <MainPage/>,
      },
      {
        path: ':gameId',
        element: <GamePage/>,
      },
    ],
  },
]);

export default router;
