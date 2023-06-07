import '../style/css/pages/home.css';
import { Space } from "antd";
import { observer } from "mobx-react";
import divisionMVD from "../store/other/DivisionMVDStore";


const Home = observer(() => {
  return (
    <div className="home_page">
      <div className="home_departament">
        <h3 className="home_departament_title title title--border">
          Подразделение
        </h3>
        <Space
          className="home_departament_inner inner"
          wrap={true}
          size={20}
          style={{ width: "100%" }}
        >
          <div className="home_departament_code">
            <p> <b>Код подразделения</b> </p>
            <span> {divisionMVD.division?.division_code ?? "Отсутствует"} </span>
          </div>
          <div className="home_departament_name">
            <p> <b>Наименование подразделения</b> </p>
            <span> {divisionMVD.division?.name_division ?? "Отсутствует"} </span>
          </div>
        </Space>
      </div>

      <div className="home_filling_rules">
        <h3 className="home_filling_rules_title title title--border">
          Правила заполнения документов
        </h3>
        <div className="home_filling_rules_inner inner">
          <ol className="home_filling_rules_number_list number_list">
            <li> Данные в формах для внесения информации
              в базу данных должны совпадать в точности
              с подданными заявлениями от заявителя.
            </li>
            <li> Фамилия, имя и отчество записываются с заглавной буквы
              и через пробелы, если вносятся в одно поле. Также допускается
              специальный знак — дефис.
            </li>
            <li> Номер телефона заполняется по
              следующему шаблону: «+7 (xxx) xxx-xx-xx».
            </li>
            <li>
              <p> Для заявления выдачи/замены паспорта документами, удостоверяющими личность, являются: </p>
              <ul className="home_filling_rules_list">
                <li> Паспорт гражданина РФ </li>
                <li> Свидетельство о рождении </li>
              </ul>
            </li>
            <li>
              <p> В случае утери паспорта заявителем заполняются: </p>
              <ul className="home_filling_rules_list">
                <li> Заявление о выдаче/замене паспорта  </li>
                <li> Заявление о утери паспорта </li>
              </ul>
            </li>
            <li>
              <p> В случае обнаружения ошибок в паспорте заявителем заполняются: </p>
              <ul className="home_filling_rules_list">
                <li> Заявление о выдаче/замене паспорта  </li>
                <li> Заявление об допущенных опечатках (ошибках) в паспорте </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="home_procedure">
        <h3 className="home_procedure_title title title--border">
          Порядок действий
        </h3>
        <div className="home_procedure_inner inner">
          <p> При приеме от заявителя заявления о выдаче/замене паспорта сотрудник, ответственный за прием документов: </p>
          <ol className="home_procedure_number_list number_list">
            <li> Проверяет правильность заполнения заявления о
              выдаче (замене) паспорта в соответствии с требованиями
              пункта 32 Административного регламента.
            </li>
            <li> Устанавливает тождественность личности заявителя с
              лицом, изображенным на фотографиях в паспорте (при замене паспорта)
              и на фотографиях, представленных заявителем.
            </li>
            <li> Оценивает соответствие фотографий установленным
              требованиям, указанным в пункте 36 Административного
              регламента, на оборотной стороне фотографий простым
              карандашом указывает фамилию и инициалы заявителя.
            </li>
            <li> Осуществляет сверку сведений, указанных заявителем
              в заявлении о выдаче (замене) паспорта, со сведениями,
              указанными в паспорте и других представленных документах.
            </li>
            <li> Проверяет наличие надлежащим образом оформленных
              документов, предусмотренных пунктом 27 Административного
              регламента.
            </li>
            <li> В случае представления заявителем документа
              об уплате государственной пошлины проверяет факт
              уплаты государственной пошлины.
            </li>
            <li> Удостоверяет личную подпись заявителя путем
              проставления своих фамилии, подписи на лицевой
              стороне заявления о выдаче (замене) паспорта.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
});


export default Home;