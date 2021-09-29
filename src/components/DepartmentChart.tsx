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

type DepartmentData = {
  level: number;
  management: number;
  operations: number;
  frontOfHouse: number;
  kitchen: number;
};

export default function GenderBarChart({ employees }: Props) {
  const [departmentData, setDepartmentData] = useState<Array<DepartmentData>>(
    []
  );
  const [payType, setPayType] = useState<string>("salary");
  const [restaurant, setRestaurant] = useState<string>("gamine");

  useEffect((): void => {
    let newData = Array<DepartmentData>();
    for (let i = 1; i < 5; i++) {
      let totalManagement: number = 0;
      let countManagement: number = 0;
      let totalOperations: number = 0;
      let countOperations: number = 0;
      let totalFrontOfHouse: number = 0;
      let countFrontOfHouse: number = 0;
      let totalKitchen: number = 0;
      let countKitchen: number = 0;
      for (let j = 0; j < employees.length; j++) {
        const employee = employees[j];
        if (restaurant !== employee.restaurant) {
          continue;
        }

        if (employee.level === i) {
          const pay = payType === "salary" ? employee.salary : employee.bonus;
          if (employee.department === "Management") {
            totalManagement = totalManagement + pay;
            countManagement = countManagement + 1;
          } else if (employee.department === "Operations") {
            totalOperations = totalOperations + pay;
            countOperations = countOperations + 1;
          } else if (employee.department === "Front of house") {
            totalFrontOfHouse = totalFrontOfHouse + pay;
            countFrontOfHouse = countFrontOfHouse + 1;
          } else if (employee.department === "Kitchen") {
            totalKitchen = totalKitchen + pay;
            countKitchen = countKitchen + 1;
          }
        }
      }
      newData.push({
        level: i,
        management: totalManagement / countManagement,
        operations: totalOperations / countOperations,
        frontOfHouse: totalFrontOfHouse / countFrontOfHouse,
        kitchen: totalKitchen / countKitchen,
      });
    }
    setDepartmentData(newData);
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
      <BarChart width={500} height={250} data={departmentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" label={{ value: "Level", position: "bottom" }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar label="Kitchen" dataKey="kitchen" fill="#FF8E00" />
        <Bar label="Management" dataKey="management" fill="#8884d8" />
        <Bar label="Operations" dataKey="operations" fill="#82ca9d" />
        <Bar label="Front of House" dataKey="frontOfHouse" fill="#BEEEF3" />
      </BarChart>
    </>
  );
}
