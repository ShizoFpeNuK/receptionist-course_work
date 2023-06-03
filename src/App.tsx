import './style/css/App.css';
import { message } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Header from "./components/MainComponents/Header";
import NotFound from "./pages/NotFound";
import Applicant from "./pages/Applicant";
import loginStore from "./store/LoginStore";
import classifiersOKIN from "./store/ClassifiersStore";
import ClassifiersServices from "./services/classifiers.service";
import LostPassportApplicant from "./pages/LostPassport";


message.config({
  duration: 2,
  maxCount: 3
})


const App = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();

  // В отдельный компонент с передачей messageApi
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Произошла непредвиденная ошибка!",
    });
  }


  const loadPage = async () => {
    Promise.all([
      ClassifiersServices.getClassifierSex(),
      ClassifiersServices.getClassifierNationality(),
      ClassifiersServices.getClassifierFamilyStatus(),
    ]).then(([
      classifiersSex,
      classifierNationality,
      classifierFamilyStatus
    ]) => {
      classifiersOKIN.setClassifierSex(classifiersSex);
      classifiersOKIN.setClassifierNationality(classifierNationality);
      classifiersOKIN.setClassifierFamilyStatus(classifierFamilyStatus);
      console.log("Классификаторы загружены!");
    }).catch(() => {
      setTimeout(() => {
        loginStore.setIsLogin(false)
        error();
      }, 2000);
    });
  }


  useEffect(() => {
    if (loginStore.isLogin) {
      messageApi.destroy();
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
                <Route path="/issue_passport" element={<Applicant />} />
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