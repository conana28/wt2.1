"use client";

import { getBottlesInCellar, getConsumedBottles } from "@/actions/bottle";
import React, { useEffect, useState } from "react";
import { TBottle, columns } from "./columns";
import { DataTable } from "./data-table";

const consumeTable = () => {
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
      <div>
        {bottles.length > 0 && <DataTable columns={columns} data={bottles} />}
      </div>
    </div>
  );
};

export default consumeTable;
