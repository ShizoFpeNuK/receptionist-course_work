import "./style/css/App.css";
import Header from "./components/MainComponents/Header";
import ApplicantComponent from "./components/ApplicantComponents/ApplicantComponent";


const App = () => {
  return (
    <div className="App">
      <header className="header" style={{ height: "150px" }}>
        {/* <Header /> */}
      </header>
      <main className="main">
        <ApplicantComponent />
      </main>
      <footer className="footer" style={{ height: "150px" }}>
      </footer>
    </div>
  );
}


export default App;