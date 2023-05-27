import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import ApplicantStore from "../store/ApplicantStore";
import LostPassportStore from "../store/LostPassportStore";
import ApplicantComponent from "../components/ApplicantComponents/ApplicantComponent";
import LostPassportComponent from "../components/LostPassportComponents/LostPassportComponent";


const applicantStore = new ApplicantStore();
const lostPassportStore = new LostPassportStore();


const LostPassportApplicant = observer(() => {
  // const [isOpenLostPassportForm, setIsOpenLostPassportForm] = useState<boolean>(false);


  useEffect(() => {
    return () => {
      applicantStore.clearStore();
      lostPassportStore.deleteLostPassportInfo();
    }
  }, [])


  return (
    <div className="applicant">
      <h1 className="applicant_header title--border" style={{ marginBottom: "40px" }}>
        Заявления об утере паспорта и замене паспорта
      </h1>
      <ApplicantComponent applicantStore={applicantStore} />
      {applicantStore.isApplicantSend &&
        <LostPassportComponent lostPassportStore={lostPassportStore} />
      }
    </div>
  )
})


export default LostPassportApplicant;