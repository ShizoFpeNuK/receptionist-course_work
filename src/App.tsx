import './style/css/App.css';
import { message } from "antd";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { errorMessage, messageConfig } from "./configs/messageAntd.config";
import Auth from "./pages/Auth";
import Chief from "./pages/personalAccounts/Chief";
import Officer from "./pages/personalAccounts/Officer";
import loginStore from "./store/auth/LoginStore";
import divisionMVD from "./store/other/DivisionMVDStore";
import classifiersOKIN from "./store/other/ClassifiersStore";
import ClassifiersServices from "./services/classifiers.service";
import DivisionMVDServices from "./services/divisionMVD.service";


const App = observer(() => {
  const [messageApi, contextHolder] = message.useMessage(messageConfig);
  const firstRender = useRef<boolean>(true);


  const loadPage = async () => {
    messageApi.destroy();

    Promise.all([
      ClassifiersServices.getClassifierSex(),
      ClassifiersServices.getClassifierFamilyStatus(),
      DivisionMVDServices.getDivisionMVD()
    ]).then(([
      classifiersSex,
      classifierFamilyStatus,
      division
    ]) => {
      classifiersOKIN.setClassifierSex(classifiersSex);
      classifiersOKIN.setClassifierFamilyStatus(classifierFamilyStatus);
      divisionMVD.setDivisionMVD(division);
      console.log("Классификаторы и что-то ещё загружены!");
    }).catch(() => {
      setTimeout(() => {
        loginStore.setIsLogin(false)
        errorMessage(messageApi);
      }, 2000);
    });
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (loginStore.isLogin) {
      loadPage();
      console.log("Загружаем классификаторы и многое другое...");
    } else {
      classifiersOKIN.clearStore();
      console.log("Чистим классификаторы и многое другое!");
    }
  }, [loginStore.isLogin])


  return (
    <div className="App">
      {contextHolder}
      {loginStore.isLogin ?
        <>
          {loginStore.user!.post === "Сотрудник" &&
            <Officer />
          }
          {loginStore.user!.post === "Начальник" &&
            <Chief />
          }
          <footer className="footer" style={{ height: "100px" }} />
        </>
        : <Auth />
      }
    </div>
  )
});


export default App;