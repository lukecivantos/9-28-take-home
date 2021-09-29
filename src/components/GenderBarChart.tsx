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
  useEffect((): void => {
    let newData = Array<GenderData>();
    for (let i = 1; i < 5; i++) {
      let totalFemale: number = 0;
      let countFemale: number = 0;
      let totalMale: number = 0;
      let countMale: number = 0;
      for (let j = 0; j < employees.length; j++) {
        const employee = employees[j];
        if (employee.level === i) {
          if (employee.gender === "Female") {
            totalFemale = totalFemale + employee.salary;
            countFemale = countFemale + 1;
          } else if (employee.gender === "Male") {
            totalMale = totalMale + employee.salary;
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
  }, [employees]);

  return (
    <BarChart width={500} height={250} data={genderData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="level" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="male" fill="#8884d8" />
      <Bar dataKey="female" fill="#82ca9d" />
    </BarChart>
  );
}
