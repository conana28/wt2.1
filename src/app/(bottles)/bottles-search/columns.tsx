"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format, set } from "date-fns";
import { ArrowUpDown, CopyIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { getNotes } from "@/actions/note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { NoteForm } from "./note-form";
import { toast } from "sonner";
import { BottleAddEditForm } from "./bottle-add-edit-form";
import { Badge } from "@/components/ui/badge";
import { BottleConsumeForm } from "./bottle-consume-form";
import { BottleDeleteForm } from "./bottle-delete-form";

export const columns: ColumnDef<TBottle>[] = [
  {
    id: "name",
    header: "Wine",
    accessorFn: (row) => `${row.wine.producer} ${row.wine.wineName}`,
  },
  {
    accessorKey: "wine.country",
    header: "Country",
  },
  {
    // show badge if noteCount > 0 and open dialog on click
    accessorKey: "noteCount",
    header: "Notes",
    cell: function Cell({ row }) {
      const [notes, setNotes] = useState<TNote[]>([]);
      const [dialogType, setDialogType] = useState("");
      const fetchNotes = async () => {
        const response = await getNotes(
          row.original.wineId,
          row.original.vintage
        );
        console.log(response);
        setNotes(response);
        setDialogType("show");
      };
      return (
        row.original.noteCount > 0 && (
          <>
            <Dialog>
              <DialogTrigger>
                <Badge onClick={fetchNotes} variant="outline">
                  {row.original.noteCount}
                </Badge>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Notes</DialogTitle>
                  <DialogDescription className="text-primary text-base">
                    {row.original.vintage} {row.original.wine.producer}{" "}
                    {row.original.wine.wineName}
                  </DialogDescription>
                </DialogHeader>
                {/* <div className="flex items-center space-x-2"> */}
                {notes.length > 0 && (
                  <ScrollArea className="h-96">
                    {notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent>
                          <p>
                            {note.author} {note.rating}
                          </p>
                          {note.noteText}
                          {note.drinkFrom ? ` From ${note.drinkFrom}` : ""}
                          {note.drinkTo ? ` To ${note.drinkTo}` : ""}
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                )}
                {notes.length === 0 && (
                  <Card>
                    <CardContent className="text-center ">
                      <p className="mt-6">No notes found for this wine</p>
                    </CardContent>
                  </Card>
                )}
                {/* </div> */}
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" size="xs" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )
      );
    },
  },
  {
    accessorKey: "vintage",
    header: ({ column }) => {
      return (
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Vintage
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
        // );
        <div className="text-center">Vintage</div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("vintage")}</div>
    ),
  },
  {
    accessorKey: "rack",
    header: "Rack",
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right mr-4">Cost</div>,
    cell: function Cell({ row }) {
      return (
        <div className="text-right mr-4">
          {row.original.cost ? (row.original.cost / 100).toFixed(2) : ""}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bottle = row.original;
      const [notes, setNotes] = useState<TNote[]>([]);
      const [dialogType, setDialogType] = useState("");
      const [bottleFormType, setBottleFormType] = useState("");
      const titles = {
        E: "Edit",
        A: "Add",
        D: "Delete",
        C: "Consume",
      };
      const [openDialog, setOpenDialog] = useState(false);

      const fetchNotes = async () => {
        const response = await getNotes(bottle.wineId, bottle.vintage);
        console.log(response);
        setNotes(response);
        setDialogType("show");
        // setOpen(true);
      };
      const addNote = async () => {
        setDialogType("add");
      };

      const btlMtce = async () => {
        console.log("btlMtce");
        setDialogType("btlMtce");
      };
      const dialogClose = () => {
        setBottleFormType("");
        setDialogType("");
        document.getElementById("closeDialog")?.click();
      };

      return (
        // <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal
                  className="h-4 w-4"
                  onClick={() => setOpenDialog(true)}
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Bottles</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              {/* Edit Bottle Maintenace */}
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setBottleFormType("E");
                    setDialogType("btlAddEdit");
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              {/* Add Bottle Maintenace */}
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setBottleFormType("A");
                    setDialogType("btlAddEdit");
                  }}
                >
                  Add
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setBottleFormType("C");
                    setDialogType("btlConsume");
                  }}
                >
                  Consume
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    // setBottleFormType("D");
                    setDialogType("btlDelete");
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              {/* Add Note */}
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={addNote}>Add note</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />

              {/* Bottle Maintenace */}
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={btlMtce}>Btl mtce.</DropdownMenuItem>
              </DialogTrigger>
              {/* Show Notes Id */}
              <DropdownMenuItem
                onClick={() =>
                  toast.info(`Bottle: ${bottle.id} , wine: ${bottle.wineId}`, {
                    position: "top-center",
                  })
                }
              >
                Show Ids
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {dialogType === "show" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Notes</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              {/* <div className="flex items-center space-x-2"> */}
              {notes.length > 0 && (
                <ScrollArea className="h-96">
                  {notes.map((note) => (
                    <Card key={note.id}>
                      <CardContent>
                        <p>
                          {note.author} {note.rating}
                        </p>
                        {note.noteText}
                        {note.drinkFrom ? ` From ${note.drinkFrom}` : ""}
                        {note.drinkTo ? ` To ${note.drinkTo}` : ""}
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              )}
              {notes.length === 0 && (
                <Card>
                  <CardContent className="text-center ">
                    <p className="mt-6">No notes found for this wine</p>
                  </CardContent>
                </Card>
              )}
              {/* </div> */}
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" size="xs" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
          {dialogType === "add" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              <NoteForm
                formType={"A"}
                vintage={bottle.vintage}
                wid={bottle.wineId}
                dialogClose={dialogClose}
              />
              {/* <DialogFooter className="sm:justify-start"> */}
              <DialogClose asChild>
                <Button
                  type="button"
                  id="closeDialog"
                  className="hidden"
                ></Button>
              </DialogClose>
              {/* </DialogFooter> */}
            </DialogContent>
          )}
          {dialogType === "btlAddEdit" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{bottleFormType} Bottle</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              <BottleAddEditForm
                btl={bottle}
                dialogClose={dialogClose}
                bottleFormType={bottleFormType}
              />
              <DialogClose asChild>
                <Button
                  type="button"
                  id="closeDialog"
                  className="hidden"
                ></Button>
              </DialogClose>
            </DialogContent>
          )}
          {dialogType === "btlAddEdit" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{bottleFormType} Bottle</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              <BottleAddEditForm
                btl={bottle}
                dialogClose={dialogClose}
                bottleFormType={bottleFormType}
              />
              <DialogClose asChild>
                <Button
                  type="button"
                  id="closeDialog"
                  className="hidden"
                ></Button>
              </DialogClose>
            </DialogContent>
          )}
          {dialogType === "btlConsume" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Consume Bottle</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              <BottleConsumeForm btl={bottle} dialogClose={dialogClose} />
              <DialogClose asChild>
                <Button
                  type="button"
                  id="closeDialog"
                  className="hidden"
                ></Button>
              </DialogClose>
            </DialogContent>
          )}
          {dialogType === "btlDelete" && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{bottleFormType} Bottle - delete</DialogTitle>
                <DialogDescription className="text-primary text-base">
                  {bottle.vintage} {bottle.wine.producer} {bottle.wine.wineName}
                </DialogDescription>
              </DialogHeader>
              <BottleDeleteForm bid={bottle.id} dialogClose={dialogClose} />
              <DialogClose asChild>
                <Button
                  type="button"
                  id="closeDialog"
                  className="hidden"
                ></Button>
              </DialogClose>
            </DialogContent>
          )}
        </Dialog>
      );
    },
  },
];

export type TBottle = {
  id: number;
  vintage: number;
  rack: string;
  shelf: string | null;
  cost: number | null;
  // consume: Date | null;
  // occasion: string | null;
  noteCount: number;
  wineId: number;
  wine: {
    producer: string;
    wineName: string;
    country: string;
  };
};

type TNote = {
  id: number;
  vintage: number;
  author: string;
  noteText: string | null;
  rating: string;
  drinkFrom: string | null;
  drinkTo: string | null;
  createdAt: Date;
  updatedAt: Date;
  wineId: number;
};
