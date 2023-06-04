import { ConfigOptions, MessageInstance } from "antd/es/message/interface";


export const messageConfig: ConfigOptions = {
  duration: 2,
  maxCount: 3
};


export const errorMessage = (messageApi: MessageInstance, text?: string) => {
  messageApi.open({
    type: "error",
    content: text ?? "Произошла непредвиденная ошибка!",
  });
}

export const successMessage = (messageApi: MessageInstance, text?: string) => {
  messageApi.open({
    type: "success",
    content: text ?? "Операция прошла успешно!",
  });
}