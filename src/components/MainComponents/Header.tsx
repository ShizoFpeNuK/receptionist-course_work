import { Link } from "react-router-dom";
import { Row, Image, MenuProps, Menu, Col } from "antd";
import { FormOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";


const itemsBase: MenuProps['items'] = [
  {
    // label: <Link to="/"> Главная </Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  // {
  //   label: <Link to="/enroll"> Записаться </Link>,
  //   key: "enroll",
  //   icon: <FormOutlined />,
  // },
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
      <Col className="navigation">
        <Menu mode="horizontal" items={itemsBase} />
      </Col>
    </Row>
  )
};


export default Header;