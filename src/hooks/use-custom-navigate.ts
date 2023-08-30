import apiGames from '@/api/api-games';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

type ReturnFunc = (to: To, options?: NavigateOptions) => void;

const useCustomNavigate = (): ReturnFunc => {
  const navigate = useNavigate();
  const func = (to: To, options?: NavigateOptions) => {
    apiGames.finishPendingRequests();
    navigate(to, options);
  };

  return func;
};

export default useCustomNavigate;
