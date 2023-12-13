"use client";

import React, { useContext, useEffect, useState } from "react";

import { Context } from "./show-table";
import { Button } from "@/components/ui/button";
import { Bottle } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WineData } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { BottleMaintainForm } from "./bottle-maintain-form";
import ShowBottleTable from "./show-bottle-table";

type Props = {
  wine: WineData;
  updateBottle: (b: Bottle) => void;
  addBottle: (b: Bottle) => void;
  deleteBottle: (b: number) => void;
  consumeBottle: (b: number) => void;
};

const ShowBottles = ({
  wine,
  updateBottle,
  deleteBottle,
  addBottle,
  consumeBottle,
}: Props) => {
  const { setShow } = useContext(Context);
  const [openDialog, setOpenDialog] = useState(false);
  const [bottle, setBottle] = useState<Bottle | null>(null);
  const [updatedBottle, setUpdatedBottle] = useState<Bottle | null>(null);
  const [addedBottle, setAddedBottle] = useState<Bottle | null>(null);
  const [deletedBottle, setDeletedBottle] = useState(0);
  const [consumedBottle, setConsumedBottle] = useState(0);
  const [isLargeScreen, setisLargeScreen] = useState(true);

  // console.log("Wine passed ", wine);

  if (wine.bottle.length < 1) {
    return (
      <div>
        <div className="text-primary ">There are no bottles of this wine</div>
        <div className="flex justify-end">
          <Button variant="secondary" size="xs" onClick={() => setShow("")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const showBottleMaintenance = (b: Bottle) => {
    console.log("showBottleMaintenance", b);
    setBottle(b);
    setOpenDialog(true);
  };

  useEffect(() => {
    function handleResize() {
      setisLargeScreen(window.innerWidth > 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (updatedBottle) {
      updateBottle(updatedBottle);
    }
  }, [updatedBottle]);

  useEffect(() => {
    if (addedBottle) {
      addBottle(addedBottle);
    }
  }, [addedBottle]);

  useEffect(() => {
    if (deletedBottle > 0) {
      deleteBottle(deletedBottle);
    }
  }, [deletedBottle]);

  useEffect(() => {
    if (consumedBottle > 0) {
      deleteBottle(consumedBottle);
    }
  }, [consumedBottle]);

  //  Type assertion (wine.bottle as Bottle[]) to explicitly tell TypeScript that you
  // are certain that wine.bottle will always be an array of Bottle objects.
  return (
    <>
      {!isLargeScreen ? (
        <ScrollArea className="h-48 lg:h-80 rounded-md border">
          <ShowBottleTable
            wine={wine}
            showBottleMaintenance={showBottleMaintenance}
          />
        </ScrollArea>
      ) : wine.bottle.length < 19 ? (
        <ShowBottleTable
          wine={wine}
          showBottleMaintenance={showBottleMaintenance}
        />
      ) : (
        <ScrollArea className="h-[704px] rounded-md border ">
          <ShowBottleTable
            wine={wine}
            showBottleMaintenance={showBottleMaintenance}
          />
        </ScrollArea>
      )}

      <div className="flex items-center justify-end space-x-4 mt-4">
        <Button size="xs" variant="default" onClick={() => setShow("")}>
          Cancel
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Maintain bottle id:{bottle?.id}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <BottleMaintainForm
              btl={bottle}
              setOpenDialog={setOpenDialog}
              setUpdatedBottle={setUpdatedBottle}
              setAddedBottle={setAddedBottle}
              setDeletedBottle={setDeletedBottle}
              setConsumedBottle={setConsumedBottle}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowBottles;
