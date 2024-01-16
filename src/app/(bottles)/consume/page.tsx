"use client";

import React, { useEffect, useState } from "react";

import { getConsumedBottles } from "@/actions/bottle";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TCBottle } from "@/types/bottle";

const ConsumeTable = () => {
  const [consumedBottles, setConsumedBottles] = useState<TCBottle[]>([]);

  // Get consumed bottles in the cellar
  useEffect(() => {
    async function fetchConsumedBottles() {
      const response = await getConsumedBottles();
      console.log(response);
      setConsumedBottles(response);
    }

    fetchConsumedBottles();
  }, []);

  return (
    <div>
      <div>
        {consumedBottles.length > 0 && (
          <DataTable columns={columns} data={consumedBottles} />
        )}
      </div>
    </div>
  );
};

export default ConsumeTable;
