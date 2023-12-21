"use client";

import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { getBottlesByCountry, getBottlesByVintage } from "@/actions/bottle";
import PieChart from "./pieChart";
import GroupedbarChart from "./barChart";

type BottleCount = {
  vintage: number;
  _count: {
    vintage: number;
  };
};

interface countryCount {
  id: string;
  value: number;
}

type vintageCount = {
  vintage: string;
  bottleCount: number;
};

const dashboard = () => {
  const [vintageData, setVintageData] = React.useState<vintageCount[]>([]);
  const [countryData, setCountryData] = React.useState<countryCount[]>([]);

  useEffect(() => {
    async function fetchCountryData() {
      const response = await getBottlesByCountry();
      const newArray: countryCount[] = [];
      // Use reduce to create a new array, grouping by country and counting bottles
      newArray.push(
        ...response.reduce((acc: { id: string; value: number }[], item) => {
          const existingId = acc.find(({ id }) => id === item.wine.country);
          if (existingId) {
            existingId.value++;
          } else {
            acc.push({ id: item.wine.country, value: 1 });
          }
          return acc;
        }, [] as { id: string; value: number }[])
      );
      // Counries to keep in the graph
      const countries = [
        "Italy",
        "Spain",
        "France",
        "New Zealand",
        "Australia",
        "Germany",
      ];
      let count = 0;
      // Count all the bottles not in the countries array
      newArray.forEach((item) => {
        if (!countries.includes(item.id)) {
          count += item.value;
        }
      });
      // Remove small countries
      const filteredArray = newArray.filter((item) =>
        countries.includes(item.id)
      );
      // add all the values of the small countries to the Other category
      filteredArray.push({ id: "Other", value: count });
      // Change the id of the New Zealand category to NZ
      filteredArray.forEach((item) => {
        if (item.id === "New Zealand") {
          item.id = "NZ";
        }
      });
      // Sort the array by value
      filteredArray.sort((a, b) => b.value - a.value);
      console.log(filteredArray);
      setCountryData(filteredArray);
    }

    async function fetchVintageData() {
      const response = await getBottlesByVintage();
      const result: BottleCount[] = response.bottlesByVintage;
      // Create array in format for graph
      let count = 0;
      const newArray: vintageCount[] = result
        .filter((item) => {
          if (item.vintage < 2000) {
            count++;
            return false;
          }
          return true;
        })
        .map((item) => ({
          vintage: item.vintage.toString(),
          bottleCount: item._count.vintage,
        }));
      newArray.unshift({ vintage: "Pre2k", bottleCount: count });
      // Check if vintage is 9999 and replace with n/v
      newArray.forEach((item) => {
        if (item.vintage === "9999") {
          item.vintage = "n/v";
        }
      });
      setVintageData(newArray);
    }

    fetchCountryData();
    fetchVintageData();
  }, []);

  return (
    <div className="container">
      {/* {bottles.length === 0 && <div>Loading...</div>} */}
      <div className="flex flex-col  sm:flex-row gap-2 mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bottles by country</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart className="w-full aspect-[4/3]" data={countryData} />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bottles by Vintage</CardTitle>
          </CardHeader>
          <CardContent>
            {vintageData.length > 0 && (
              <GroupedbarChart
                className="w-full aspect-[4/3]"
                data={vintageData}
              />
            )}
          </CardContent>
        </Card>
      </div>
      {/* Show bottles by vintage */}
    </div>
  );
};

export default dashboard;
