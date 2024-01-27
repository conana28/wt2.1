import React, { useContext, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bottle } from "@prisma/client";
import { WineData } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WineContext } from "./page";
import { Button } from "@/components/ui/button";
import { BottleMaintainForm } from "./bottle-maintain-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  btls: Bottle[];
}

function showBottleTable({ btls }: Props) {
  const [openDialog, setOpenDialog] = useState(false); // Btl matce form Dialog open state
  const { setShowAction } = useContext(WineContext);
  const [btl, setBtl] = useState<Bottle | null>(null); // Bottle to be maintained
  const [bottles, setBottles] = useState<Bottle[]>(btls); // Bottles array to be displayed

  useEffect(() => {
    console.log("UE", bottles);
  }, [bottles]);
  // Call back to update the bottles array when a bottle is updated
  function updateBottleArray(response: { success: boolean; data: Bottle }) {
    console.log("Response:", response);

    if (response.success) {
      const updatedBottle = response.data;

      setBottles((prevBottles) => {
        // Find the index of the bottle to update
        const index = prevBottles.findIndex(
          (bottle) => bottle.id === updatedBottle.id
        );

        console.log("Index:", index);

        // Create a new array with the updated bottle
        const newBottles = [...prevBottles];
        newBottles[index] = updatedBottle;

        console.log("New bottles:", newBottles);

        return newBottles;
      });
    }
  }

  // Callback to add a bottle to the bottles array
  function addBottleToBottlesArray(response: {
    success: boolean;
    data: Bottle;
  }) {
    console.log("Ad Response:", response);

    if (response.success) {
      const newBottle = response.data;

      setBottles((prevBottles) => {
        // Create a new array with the updated bottle
        const newBottles = [...prevBottles, newBottle];

        console.log("New bottles:", newBottles);

        return newBottles;
      });
    }
  }
  // Callback to delete a bottle from the bottles array
  function deleteBottleFromBottlesArray(response: { success: boolean }) {
    console.log("Delete Response:", response);

    if (response.success) {
      setBottles((prevBottles) => {
        // Create a new array with the deleteed bottle
        const newBottles = prevBottles.filter(
          (bottle) => bottle.id !== btl!.id
        );
        console.log("New bottles:", newBottles);
        return newBottles;
      });
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bottles</CardTitle>
          <CardDescription>
            {/* {wine.producer} {wine.wineName}{" "} */}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {bottles.map((bottle) => (
                <TableRow
                  key={bottle.id}
                  onClick={() => {
                    setBtl(bottle); // Set the bottle to be maintained
                    setOpenDialog(true); // Open the dialog
                  }}
                >
                  <TableCell className="font-medium">
                    {bottle.vintage}
                  </TableCell>
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
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-end w-full">
            <Button
              size="xs"
              variant="secondary"
              onClick={() => setShowAction("")}
            >
              Return
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Maintain bottle id: {btl?.id} </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="text-sm">{btl?.vintage}</p>
          </DialogDescription>

          <div className="flex items-center space-x-2">
            <BottleMaintainForm
              bottle={btl}
              updateBottleArray={updateBottleArray}
              addBottleToBottlesArray={addBottleToBottlesArray}
              deleteBottleFromBottlesArray={deleteBottleFromBottlesArray}
              setOpenDialog={setOpenDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default showBottleTable;
