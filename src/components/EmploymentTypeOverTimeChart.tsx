import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Employee } from "./../useRestaurantData";

type Props = {
  employees: Array<Employee>;
};

type EmploymentTypeData = {
  level: number;
  fulltime?: number;
  parttime?: number;
  contractor?: number;
  startdate: Date;
};

export default function GenderBarChart({ employees }: Props) {
  const [levelSelected, setLevelSelected] = useState<string>("1");
  const [employmentTypeData, setEmploymentTypeData] = useState<
    Array<EmploymentTypeData>
  >([]);

  useEffect((): void => {
    let newData = Array<EmploymentTypeData>();
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      if (employee.level === parseInt(levelSelected)) {
        newData.push({
          level: employee.level,
          fulltime:
            employee.employmentType === "Full time"
              ? employee.salary
              : undefined,
          parttime:
            employee.employmentType === "Part time"
              ? employee.salary
              : undefined,
          contractor:
            employee.employmentType === "contractor"
              ? employee.salary
              : undefined,
          startdate: employee.startDate,
        });
      }
    }

    newData.sort(function (a, b) {
      if (a.startdate < b.startdate) return -1;
      if (a.startdate > b.startdate) return 1;
      return 0;
    });

    setEmploymentTypeData(newData);
  }, [employees, levelSelected]);

  console.log(employmentTypeData);

  return (
    <>
      <select
        value={levelSelected}
        onChange={(event) => {
          setLevelSelected(event.target.value);
        }}
      >
        <option value={"1"}>Level 1</option>
        <option value={"2"}>Level 2</option>
        <option value={"3"}>Level 3</option>
        <option value={"4"}>Level 4</option>
      </select>
      <LineChart
        width={500}
        height={250}
        data={employmentTypeData}
        margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
      >
        <XAxis
          label={{ value: "Start Date", position: "bottom" }}
          dataKey="startdate"
        />
        <YAxis label={{ value: "Salary", angle: -90, position: "left" }} />
        <Tooltip />
        <Legend verticalAlign="top" align="center" />
        <Line
          name="Full Time"
          type="monotone"
          dataKey="fulltime"
          stroke="#8884d8"
        />
        <Line
          name="Part Time"
          type="monotone"
          dataKey="parttime"
          stroke="#82ca9d"
        />
        <Line
          name="Contractor"
          type="monotone"
          dataKey="contractor"
          stroke="#e28743"
        />
      </LineChart>
    </>
  );
}
