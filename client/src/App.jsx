import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Employees from "./pages/employee/index";
import MainPage from "./pages/mainPage/index";
import Tribes from "./pages/tribes/index";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tribes" element={<Tribes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
