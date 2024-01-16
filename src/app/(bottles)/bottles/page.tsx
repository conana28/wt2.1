"use client";

import { getBottlesInCellar, getConsumedBottles } from "@/actions/bottle";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TBottle } from "@/types/bottle";

const BottleTable = () => {
  const [bottles, setBottles] = useState<TBottle[]>([]);

  // Get bottles in the cellar
  useEffect(() => {
    async function fetchBottles() {
      const response = await getBottlesInCellar();
      console.log(response);
      setBottles(response);
    }

    fetchBottles();
  }, []);

  return (
    <div>
      <p>/bottles</p>
      {bottles.length > 0 && <DataTable columns={columns} data={bottles} />}
    </div>
  );
};

export default BottleTable;
