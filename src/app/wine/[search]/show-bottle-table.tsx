import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bottle } from "@prisma/client";
import React from "react";
import { WineData } from "./columns";

interface Props {
  wine: WineData;
  showBottleMaintenance: (bottle: Bottle) => void;
}

function showBottleTable({ wine, showBottleMaintenance }: Props) {
  // Get bottle array from wine and sort by vintage
  const bottles = wine.bottle as Bottle[]; // Assert that wine.bottles is of type Bottle[]

  // Check if bottles is not an empty array before sorting
  if (Array.isArray(bottles) && bottles.length > 0) {
    bottles.sort((a, b) => a.vintage - b.vintage);
  } else {
    // Handle the case where wine.bottles is an empty array or not an array
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Vintage</TableHead>
          <TableHead>Rack</TableHead>
          <TableHead>Shelf</TableHead>
          <TableHead>Id</TableHead>
          <TableHead className="text-right">Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {(wine.bottle as Bottle[]).map((bottle) => ( */}
        {bottles.map((bottle) => (
          <TableRow
            key={bottle.id}
            onClick={() => showBottleMaintenance(bottle)}
          >
            <TableCell className="font-medium">{bottle.vintage}</TableCell>
            <TableCell>{bottle.rack}</TableCell>
            <TableCell>{bottle.shelf}</TableCell>
            <TableCell>{bottle.id}</TableCell>
            <TableCell className="text-right">
              {bottle.cost ? (bottle.cost / 100).toFixed(2) : "n/a"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default showBottleTable;
