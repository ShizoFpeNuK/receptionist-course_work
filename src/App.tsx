import "./style/css/App.css";
import { useForm } from "antd/es/form/Form";
import Header from "./components/MainComponents/Header";
import ApplicantComponent from "./components/ApplicantComponents/ApplicantComponent";
import CardFormTemporaryCertificate from "./components/TemporaryСertificateComponents/cards/CardFormTemporaryСertificate";
import CardFormLostPassportApplication from "./components/LostPassportApplicationComponents/cards/CardFormLostPassportApplication";
import CardFormNewPassport from "./components/NewPassportComponents/cards/CardFormNewPassport";


const App = () => {
  const [form] = useForm();


  const onFinish = (values: any) => {
    console.log(values);
  }


  return (
    <div className="App">
      <header className="header" style={{ height: "150px" }}>
        {/* <Header /> */}
      </header>
      <main className="main">
        {/* <ApplicantComponent /> */}
        {/* <CardFormTemporaryCertificate form={form} onFinish={onFinish} /> */}
        {/* <CardFormLostPassportApplication form={form} onFinish={onFinish} /> */}
        <CardFormNewPassport form={form} onFinish={onFinish} />
      </main>
      <footer className="footer" style={{ height: "150px" }}>
      </footer>
    </div>
  );
}


export default App;