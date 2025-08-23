import{ BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leads from "./pages/Leads";
import LeadForm from "./pages/LeadForm";


import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Leads />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lead/new" element={<LeadForm />} />
        <Route path="/lead/:id/edit" element={<LeadForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

