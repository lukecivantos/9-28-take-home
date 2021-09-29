import "./App.css";

import EmploymentTypeOverTimeChart from "./components/EmploymentTypeOverTimeChart";
import GenderBarChart from "./components/GenderBarChart";
import { ResponsiveContainer } from "recharts";
import { useRestaurantData } from "./useRestaurantData";

export default function App(): JSX.Element {
  const [restaurantData, isLoading] = useRestaurantData();

  const genderBarChart = (
    <div className="chart-container">
      <h1>Salary by Level and Gender</h1>
      <ResponsiveContainer width="50%">
        <GenderBarChart employees={restaurantData}></GenderBarChart>
      </ResponsiveContainer>
    </div>
  );

  const employmentTypeChart = (
    <div className="chart-container">
      <h1>Pay by Employment Type</h1>
      <ResponsiveContainer width="50%">
        <EmploymentTypeOverTimeChart
          employees={restaurantData}
        ></EmploymentTypeOverTimeChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="app">
      <div className="title-doc">Restaurant Group of San Francisco</div>
      <div className="grid-display">
        {genderBarChart} {employmentTypeChart}
      </div>
    </div>
  );
}
