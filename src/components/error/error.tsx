import { FC } from 'react';
import CustomButton from '../custom-button/custom-button';
import './error.pcss';

const reloadPage = () => window.location.reload();

const Error: FC = () => (
  <div className="error text-lg-font-medium">
    <div className="error__content">
      Oh, sorry! We can’t load the page :(
      <CustomButton label="Reload" onClick={reloadPage}/>
    </div>
  </div>
);

export default Error;
