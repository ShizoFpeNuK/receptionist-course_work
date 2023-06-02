import { Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { CardForm } from "../../../style/typescript/cardForm";
import { useNavigate } from "react-router-dom";
import { ILogin, IUser } from "../../../models/types/user.model";
import FormAuth from "../forms/FormAuth";
import loginStore from "../../../store/LoginStoreClass";
import LoginServices from "../../../services/login.service";


const CardFormAuth = () => {
  const [form] = useForm();
  const navigate = useNavigate();


  const onFinish = async (values: ILogin) => {
    await LoginServices.login(values.username, values.password)
      .then((user: IUser) => {
        loginStore.setIsLogin(true);
        loginStore.setUser(user);
        localStorage.setItem("token", user.access_token);
        // navigate("/personal_account");
        form.resetFields();
      })
      .catch(() => console.log("Не залогинились"));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Card style={CardForm}>
      <FormAuth
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Card>
  )
}


export default CardFormAuth;