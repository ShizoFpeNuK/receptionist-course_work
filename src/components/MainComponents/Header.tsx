import '../../style/css/components/MainComponents/header.css';
import { Row, Image, MenuProps, Menu, Col } from "antd";


interface HeaderProps {
  menuList: MenuProps["items"],
}


const Header = (props: HeaderProps) => {
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
          items={props.menuList}
          style={{ justifyContent: "flex-end" }}
        />
      </Col>
    </Row>
  )
};


export default Header;