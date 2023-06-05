import '../../style/css/components/MainComponents/header.css';
import { Link } from "react-router-dom";
import { Row, Image, MenuProps, Menu, Col } from "antd";
import { FileAddOutlined, FolderAddOutlined, HomeOutlined } from "@ant-design/icons";


const itemsBase: MenuProps['items'] = [
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
]


const Header = () => {
  return (
    <Row
      className="navigation title--border"
      wrap={false}
    >
      <Col
        style={{ textAlign: "left" }}
        span={2}
      >
        <Image
          className="logo"
          src={require("../../images/logo/emblem_MVD.png")}
          preview={false}
        />
      </Col>
      <Col span={22}>
        <Menu
          mode="horizontal"
          items={itemsBase}
          style={{ justifyContent: "flex-end" }}
        />
      </Col>
    </Row>
  )
};


export default Header;