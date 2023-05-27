import "./style/css/App.css";
import { useForm } from "antd/es/form/Form";
import { Route, Routes } from "react-router-dom";
import Header from "./components/MainComponents/Header";
import NotFound from "./pages/NotFound";
import Applicant from "./pages/Applicant";
import CardFormNewPassport from "./components/NewPassportComponents/cards/CardFormNewPassport";
import LostPassportApplicant from "./pages/LostPassport";
import CardFormTemporaryCertificate from "./components/TemporaryСertificateComponents/cards/CardFormTemporaryСertificate";


const App = () => {
  const [form] = useForm();


  const onFinish = (values: any) => {
    console.log(values);
  }


  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <Routes>
            <Route path="/issue_passport" element={< Applicant />} />
            <Route path="/lost_passport" element={<LostPassportApplicant />} />
            {/* <Route path="/auth" element={<Auth />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <CardFormTemporaryCertificate form={form} onFinish={onFinish} /> */}
          {/* <CardFormLostPassportApplication form={form} onFinish={onFinish} /> */}
          {/* <CardFormNewPassport form={form} onFinish={onFinish} /> */}
        </main>
        <footer className="footer" style={{ height: "150px" }}>
        </footer>
      </div>
    </div>
  );
}


export default App;