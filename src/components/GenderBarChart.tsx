import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import { Employee } from "./../useRestaurantData";

type Props = {
  employees: Array<Employee>;
};

type GenderData = {
  level: number;
  male: number;
  female: number;
};

export default function GenderBarChart({ employees }: Props) {
  const [genderData, setGenderData] = useState<Array<GenderData>>([]);
  const [payType, setPayType] = useState<string>("salary");
  const [restaurant, setRestaurant] = useState<string>("gamine");

  useEffect((): void => {
    let newData = Array<GenderData>();
    for (let i = 1; i < 5; i++) {
      let totalFemale: number = 0;
      let countFemale: number = 0;
      let totalMale: number = 0;
      let countMale: number = 0;
      for (let j = 0; j < employees.length; j++) {
        const employee = employees[j];
        if (restaurant !== employee.restaurant) {
          continue;
        }

        if (employee.level === i) {
          const pay = payType === "salary" ? employee.salary : employee.bonus;
          if (employee.gender === "Female") {
            totalFemale = totalFemale + pay;
            countFemale = countFemale + 1;
          } else if (employee.gender === "Male") {
            totalMale = totalMale + pay;
            countMale = countMale + 1;
          }
        }
      }
      newData.push({
        level: i,
        male: totalMale / countMale,
        female: totalFemale / countFemale,
      });
    }
    setGenderData(newData);
  }, [employees, payType, restaurant]);

  return (
    <>
      <select
        value={payType}
        onChange={(event) => {
          setPayType(event.target.value);
        }}
      >
        <option value={"salary"}>Salary</option>
        <option value={"bonus"}>Bonus</option>
      </select>
      <select
        value={restaurant}
        onChange={(event) => {
          setRestaurant(event.target.value);
        }}
      >
        <option value={"gamine"}>Gamine</option>
        <option value={"hookfish"}>Hookfish</option>
      </select>
      <BarChart width={500} height={250} data={genderData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" label={{ value: "Level", position: "bottom" }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" fill="#8884d8" />
        <Bar dataKey="female" fill="#82ca9d" />
      </BarChart>
    </>
  );
}
