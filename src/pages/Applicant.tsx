import { useEffect } from "react";
import ApplicantionStore from "../store/ApplicantStore";
import ApplicantComponent from "../components/ApplicantComponents/ApplicantComponent";


const applicant = new ApplicantionStore();


const Applicant = () => {
  useEffect(() => {
    return () => {
      applicant.clearStore();
    }
  }, [])


  return (
    <div className="applicant">
      <h1
        className="applicant_header title--border"
        style={{ marginBottom: "40px" }}
      >
        Заявление о выдаче/замене паспорта
      </h1>
      <ApplicantComponent applicantStore={applicant} />
    </div>
  )
}


export default Applicant;