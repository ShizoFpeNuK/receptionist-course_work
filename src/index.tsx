import 'dayjs/locale/ru';
import './style/css/index.css';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import locale from "antd/locale/ru_RU";
import ReactDOM from "react-dom/client";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={locale}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
