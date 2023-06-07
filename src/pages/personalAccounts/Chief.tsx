import { MenuProps } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import {
  LoginOutlined, SearchOutlined,
  FileAddOutlined, FolderAddOutlined,
  HomeOutlined
} from "@ant-design/icons";
import Home from "../Home";
import Header from "../../components/MainComponents/Header";
import NotFound from "../NotFound";
import loginStore from "../../store/auth/LoginStore";
import Applicantion from "../applications/Applicantion";
import LostPassport from "../applications/LostPassport";
import ApplicationFind from "../applications/ApplicationFind";


const items: MenuProps["items"] = [
  {
    label: <a onClick={() => loginStore.setIsLogin(false)}> Выйти </a>,
    key: "logout",
    icon: <LoginOutlined />,
  },
  {
    label: <Link to="/"> Главная </Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/issue_passport"> Выдача/замена паспорта </Link>,
    key: "issue_passport",
    icon: <FileAddOutlined />,
  },
  {
    label: <Link to="/lost_passport"> Утеря паспорта </Link>,
    key: "lost_passport",
    icon: <FolderAddOutlined />,
  },
  {
    label: <Link to="/find_application"> Заявления выдачи/замены паспорта </Link>,
    key: "find_application",
    icon: <SearchOutlined />,
  },
]


const Chief = () => {
  return (
    <>
      <header className="header">
        <Header menuList={items} />
      </header>
      <div className="wrapper">
        <main className="main">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/issue_passport" element={<Applicantion />} />
            <Route path="/lost_passport" element={<LostPassport />} />
            <Route path="/find_application" element={<ApplicationFind />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  )
}


export default Chief;