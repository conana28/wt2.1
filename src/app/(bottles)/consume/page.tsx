"use client";

import { getConsumedBottles } from "@/actions/bottle";
import React, { useEffect, useState } from "react";
import { TBottle, columns } from "./columns";
import { DataTable } from "./data-table";

const consumeTable = () => {
  const [consumedBottles, setConsumedBottles] = useState<TBottle[]>([]);

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
      {/* {consumedBottles.length > 0 &&
        consumedBottles.map((bottle) => (
          <div key={bottle.id}>
            <p>
              {bottle.vintage} {bottle.wine.producer}
            </p>
          </div>
        ))}
      <div> */}
      <div>
        {consumedBottles.length > 0 && (
          <DataTable columns={columns} data={consumedBottles} />
        )}
      </div>
    </div>
  );
};

export default consumeTable;
