import './style/css/App.css';
import { useForm } from "antd/es/form/Form";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/MainComponents/Header";
import NotFound from "./pages/NotFound";
import Applicant from "./pages/Applicant";
import CardFormNewPassport from "./components/NewPassportComponents/cards/CardFormNewPassport";
import LostPassportApplicant from "./pages/LostPassport";


const App = () => {
  // const [form] = useForm();


  // const onFinish = (values: any) => {
  //   console.log(values);
  // }


  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <div className="wrapper">
        <main className="main">
          <Routes>
            {/* {!token &&
              <Route path="/auth" element={<Auth />} />
            } */}
            <Route index path="/" element={<Home />} />
            <Route path="/issue_passport" element={<Applicant />} />
            <Route path="/lost_passport" element={<LostPassportApplicant />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <CardFormNewPassport form={form} onFinish={onFinish} /> */}
        </main>
      </div>
      <footer className="footer" style={{ height: "150px" }}>
      </footer>
    </div>
  );
}


export default App;