"use client";

import React, { use, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import {
  getBottleCountByVintage,
  getBottlesByCountry,
  getBottlesByVintage,
} from "@/actions/bottle";
import PieChart from "./pieChart";
import GroupedbarChart from "./barChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

type bottlesByVintage = {
  id: number;
  vintage: number;
  rack: string;
  shelf: string | null;
  cost: number | null;
  wine: {
    producer: string;
    wineName: string;
    country: string;
  };
};

const dashboard = () => {
  const [country, setCountry] = React.useState<string>("All");
  const [vintageData, setVintageData] = React.useState<vintageCount[]>([]);
  const [countryData, setCountryData] = React.useState<countryCount[]>([]);
  const [showBottlesByVintage, setShowBottlesByVintage] = React.useState(false);
  const [vintage, setVintage] = React.useState<number>(0); // store vintage selected in bar chart
  const [bottlesByVintage, setBottlesByVintage] = React.useState<
    bottlesByVintage[]
  >([]);

  useEffect(() => {
    // Get Data for pie chart
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

    fetchCountryData();
  }, []);

  useEffect(() => {
    // Get Data for bar chart
    async function fetchVintageCountData() {
      const response = await getBottleCountByVintage(country, 0);
      const result: BottleCount[] = response.bottleCountByVintage;
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

    fetchVintageCountData();
  }, [country]);

  useEffect(() => {
    // Get List bottles by vintage
    async function fetchBottlesByVintageData() {
      const response = await getBottlesByVintage(country, vintage);
      setBottlesByVintage(response);
      console.log(response);
    }

    if (vintage > 0) fetchBottlesByVintageData();
  }, [vintage, country]);

  return (
    <main className="container">
      <div className="flex flex-col gap-4 p-4">
        <div className="grid lg:grid-cols-4 gap-4">
          <Card className="bg-slate-400">
            <CardDescription className="text-center text-slate-50">
              Bottles
            </CardDescription>
            <p className="text-center pb-1">732</p>
          </Card>
          <Card className="bg-slate-600">
            <CardDescription className="text-center text-slate-50">
              Wines
            </CardDescription>
            <p className="text-center pb-1">376</p>
          </Card>
          <Card className="bg-slate-500">
            {" "}
            <CardDescription className="text-center text-slate-50">
              Consumed
            </CardDescription>
            <p className="text-center pb-1">AAA</p>
          </Card>
          <Card className="bg-slate-700">
            {" "}
            <CardDescription className="text-center text-slate-50">
              Countries
            </CardDescription>
            <p className="text-center pb-1">AAA</p>{" "}
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Wine Distribution by Country</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                className="w-full aspect-[4/3]"
                data={countryData}
                setCountry={setCountry}
              />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Wines by Vintage</CardDescription>
            </CardHeader>
            <CardContent>
              {vintageData.length > 0 && (
                <GroupedbarChart
                  className="w-full aspect-[4/3]"
                  data={vintageData}
                  setShowBottlesByVintage={setShowBottlesByVintage}
                  setVintage={setVintage}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default dashboard;
