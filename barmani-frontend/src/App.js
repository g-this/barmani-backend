import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BudgetTracker from "./pages/BudgetTracker";
import EmployeeSchedule from "./pages/EmployeeSchedule";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">Barmani</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/schedule" element={<EmployeeSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
