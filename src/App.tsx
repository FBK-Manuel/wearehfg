import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./router/Router";
import ScrollToTopButton from "./assets/ScrollToTopBar";
// import ScrollToTop from "./assets/ScollToTop";

function App() {
  return (
    <>
      <div>
        <Router />
        {/* your routes/components */}
        <ToastContainer position="top-right" />
        <ScrollToTopButton />
        {/*  */}
      </div>
    </>
  );
}

export default App;
