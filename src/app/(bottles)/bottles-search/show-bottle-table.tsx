import React from "react";

import { TBottle, columns } from "./columns";
import { DataTable } from "./data-table";

// Define a type for the props
type ShowBottleTableProps = {
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
