import '../../style/css/components/MainComponents/header.css';
import { Link } from "react-router-dom";
import { Row, Image, MenuProps, Menu, Col } from "antd";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";


const itemsBase: MenuProps['items'] = [
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
      justify={'center'}
      wrap={false}
      className="header_row"
    >
      <Col className="header_logo">
        {/* <Image
          src={require('../../options/images/logo/logo.png')}
          preview={false}
        /> */}
      </Col>
      <Col className="navigation title--border" span={24}>
        <Menu
          style={{ justifyContent: "flex-end" }}
          mode="horizontal"
          items={itemsBase}
        />
      </Col>
    </Row>
  )
};


export default Header;