import '../style/css/pages/auth.css';
import CardFormAuth from "../components/AuthComponents/cards/CardFormAuth";


const Auth = () => {
  return (
    <div className="auth_page">
      <h1 className="auth_header title--border"> Аутентификация </h1>
      <div className="auth_form">
        <CardFormAuth />
      </div>
    </div>
  )
};


export default Auth;