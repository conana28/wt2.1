import React from "react";

import { TBottle, columns } from "./columns";
import { DataTable } from "./data-table";
import { Toaster } from "sonner";

// Define a type for the props
export type ShowBottleTableProps = {
  bottlesFound: TBottle[];
};

// Use the props type in the component
export const ShowBottleTable = ({ bottlesFound }: ShowBottleTableProps) => {
  return (
    <div className="-mt-4">
      {/* {bottlesFound.length > 0 && ( */}
      <DataTable columns={columns} data={bottlesFound} />

      {/* )} */}
    </div>
  );
};
