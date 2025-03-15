import { useEffect, useState } from "react";
import axios from "axios";

const BudgetTracker = () => {
  const [budget, setBudget] = useState([]);
  const API_URL = "https://your-render-backend.onrender.com/budget"; // REPLACE WITH YOUR BACKEND URL

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setBudget(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Budget Tracker</h2>
      <ul>
        {budget.map((entry) => (
          <li key={entry.id}>
            {entry.date} - Income: €{entry.income} - Expenses: €{entry.expenses}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;
