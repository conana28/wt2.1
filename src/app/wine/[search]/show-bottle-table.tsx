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
        {(wine.bottle as Bottle[]).map((bottle) => (
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
