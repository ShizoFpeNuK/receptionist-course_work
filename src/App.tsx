import "./style/css/App.css";
import { useForm } from "antd/es/form/Form";
import CardFormApplicant from "./components/cards/CardApplicant";


const App = () => {
  const [form] = useForm();


  const onFinish = (values: any) => {
    console.log(values);
  }


  return (
    <div className="App">
      <header className="header" style={{ height: "150px" }}>
      </header>
      <main className="main">
        <CardFormApplicant form={form} onFinish={onFinish} title="Данные о заявителе" />
      </main>
      <footer className="footer" style={{ height: "150px" }}>
      </footer>
    </div>
  );
}


export default App;