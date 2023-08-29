import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./components/header/header";

export default function App() {
  return (
    <div className="app">
      <Layout>
        <CustomHeader />
        <Outlet />
      </Layout>
    </div>
  );
}
