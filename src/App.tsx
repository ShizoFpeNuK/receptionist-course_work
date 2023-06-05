import './style/css/App.css';
import { message } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { errorMessage, messageConfig } from "./configs/messageAntd.config";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/MainComponents/Header";
import NotFound from "./pages/NotFound";
import Applicantion from "./pages/applications/Applicantion";
import loginStore from "./store/auth/LoginStore";
import classifiersOKIN from "./store/other/ClassifiersStore";
import ClassifiersServices from "./services/classifiers.service";
import LostPassportApplicant from "./pages/applications/LostPassport";


message.config(messageConfig);


const App = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();


  const loadPage = async () => {
    messageApi.destroy();

    Promise.all([
      ClassifiersServices.getClassifierSex(),
      ClassifiersServices.getClassifierFamilyStatus(),
    ]).then(([
      classifiersSex,
      classifierFamilyStatus,
    ]) => {
      classifiersOKIN.setClassifierSex(classifiersSex);
      classifiersOKIN.setClassifierFamilyStatus(classifierFamilyStatus);
      console.log("Классификаторы загружены!");
    }).catch(() => {
      setTimeout(() => {
        loginStore.setIsLogin(false)
        errorMessage(messageApi);
      }, 2000);
    });
  }


  useEffect(() => {
    if (loginStore.isLogin) {
      loadPage();
      console.log("Загружаем классификаторы...");
    }
  }, [loginStore.isLogin])


  return (
    <div className="App">
      {contextHolder}
      {loginStore.isLogin ?
        <>
          <header className="header">
            <Header />
          </header>
          <div className="wrapper">
            <main className="main">
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/issue_passport" element={<Applicantion />} />
                <Route path="/lost_passport" element={<LostPassportApplicant />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <footer className="footer" style={{ height: "100px" }}>
          </footer>
        </>
        : <Auth />
      }
    </div>
  )
});


export default App;