// import '../style/css/auth/auth.css';
import { observer } from "mobx-react";
import CardFormAuth from "../components/AuthComponents/cards/CardFormAuth";


const Auth = observer(() => {
  return (
    <div className="auth_page">
      <h1 className="auth_header title--border"> Аутентификация </h1>
      <div className="auth_form">
        <CardFormAuth />
      </div>
    </div>
  )
})


export default Auth;