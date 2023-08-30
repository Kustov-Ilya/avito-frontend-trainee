import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import CustomHeader from './components/header/header';
import { FC } from 'react';

const App: FC = () => (
  <div className="app">
    <Layout>
      <CustomHeader/>
      <Outlet/>
    </Layout>
  </div>
);

export default App;
