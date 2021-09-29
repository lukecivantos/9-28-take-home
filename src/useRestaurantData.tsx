import { useEffect, useState } from "react";

import { ParseResult } from "papaparse";
import { readString } from "react-papaparse";

type ParseEmployee = {
  email: string;
  firstName: string;
  lastName: string;
  startDate: string;
  employmentType: string;
  department: string;
  level: string;
  city: string;
  country: string;
  gender: string;
  salary: string;
  bonus: string;
};

/**
 * Simplifying the Data
 *
 * - I convert the numbers to numbers
 * - I remove country because it's the same for every employee
 * - I convert start date to a date
 * - I add restaurant so we can combine the dataset
 **/
export type Employee = {
  email: string;
  firstName: string;
  lastName: string;
  startDate: Date;
  employmentType: string;
  department: string;
  level: number;
  city: string;
  gender: string;
  salary: number;
  bonus: number;
  restaurant: string;
};

export function useRestaurantData(): [Array<Employee>, boolean] {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    async function getData(): Promise<void> {
      const hookfishData = await fetch("./data/hookfish.csv");
      const hookfishDataText = await hookfishData.text();
      const hookfishDataObject = readString<ParseEmployee>(hookfishDataText, {
        header: true,
      });

      const gamineData = await fetch("./data/gamine.csv");
      const gamineDataText = await gamineData.text();
      const gamineDataObject = readString<ParseEmployee>(gamineDataText, {
        header: true,
      });

      const parseEmployeeData = (
        dataObject: ParseResult<ParseEmployee>,
        restaurant: string
      ): Array<Employee> => {
        return dataObject.data.map((employee: ParseEmployee): Employee => {
          const [YYYY, MM, DD] = employee.startDate.split("-");
          const startDate = new Date(
            parseInt(YYYY),
            parseInt(MM) - 1,
            parseInt(DD)
          );

          return {
            email: employee.email,
            firstName: employee.firstName,
            lastName: employee.lastName,
            startDate,
            employmentType:
              employee.employmentType === "full time" ||
              employee.employmentType === "fullTime"
                ? "Full time"
                : employee.employmentType,
            department: employee.department,
            level: parseInt(employee.level),
            city: employee.city,
            gender: employee.gender,
            salary: parseInt(employee.salary),
            bonus: parseInt(employee.bonus),
            restaurant: restaurant,
          };
        });
      };

      const hookfishEmployees = parseEmployeeData(
        hookfishDataObject,
        "hookfish"
      );
      const gamineEmployees = parseEmployeeData(gamineDataObject, "gamine");

      setEmployees(hookfishEmployees.concat(gamineEmployees));
      setIsLoading(false);
    }

    getData();
  }, []);

  return [employees, isLoading];
}
