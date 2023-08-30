import './jumbotron.pcss';
import CustomButton from '../custom-button/custom-button';
import useCustomNavigate from '@/hooks/use-custom-navigate';
import { GAME_PAGE_URL, IMAGE_URL } from '@/constants/jumbotron';
import { FC, MouseEventHandler, useCallback } from 'react';

const Jumbotron: FC = () => {
  const customNavigate = useCustomNavigate();
  const onClick: MouseEventHandler<HTMLElement> = useCallback(
    () => customNavigate(GAME_PAGE_URL),
    [],
  );

  return (
    <section className="jumbotron">
      <img src={IMAGE_URL} alt="Реклама игры" className="jumbotron__image"/>
      <CustomButton onClick={onClick} label="go to the game"/>
    </section>
  );
};

export default Jumbotron;
