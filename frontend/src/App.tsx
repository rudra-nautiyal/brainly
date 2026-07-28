import { DashBoard } from "./pages/dashboard";
import { SharedBrain } from "./pages/SharedBrain";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/share/:shareLink" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
