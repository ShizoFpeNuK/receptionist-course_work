import { useEffect } from "react";
import ApplicantComponent from "../components/ApplicantComponents/ApplicantComponent";
import ApplicantStore from "../store/ApplicantStore";


const applicant = new ApplicantStore();


const Applicant = () => {
  useEffect(() => {
    return () => {
      applicant.clearStore();
    }
  }, [])


  return (
    <div className="applicant">
      <h1 className="applicant_header title--border" style={{ marginBottom: "40px" }}>
        Заявление о выдаче/замене паспорта
      </h1>
      <ApplicantComponent applicantStore={applicant} />
    </div>
  )
}


export default Applicant;