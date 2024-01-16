import React, { useState } from "react";
import { ShowBottleTableProps } from "./show-bottle-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import { addNote, getNotes } from "@/actions/note";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { BottleAddEditForm } from "./bottle-add-edit-form";
import { BottleConsumeForm } from "./bottle-consume-form";
import { BottleDeleteForm } from "./bottle-delete-form";
import { NoteForm } from "./note-form";
import { Button } from "@/components/ui/button";
import { TNote } from "./columns";
import { Badge } from "@/components/ui/badge";

const ShowBottleMobile = ({ bottlesFound }: ShowBottleTableProps) => {
  const [dialogType, setDialogType] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bottleFormType, setBottleFormType] = useState("");
  const [notes, setNotes] = useState<TNote[]>([]);
  const addNote = async () => {
    setDialogType("add");
  };
  const dialogClose = () => {
    setBottleFormType("");
    setDialogType("");
    document.getElementById("closeDialog")?.click();
  };
  const fetchNotes = async (wid: number, vint: number) => {
    const response = await getNotes(wid, vint);

    console.log(response);
    setNotes(response);
    setDialogType("show");
  };
  return (
    <div>
      <ScrollArea className="h-80 w-full rounded-md border mt-4 ">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">
            {bottlesFound.length} Matching bottles
          </h4>
          <Separator className="mb-2" />
          {bottlesFound.map((bottle) => (
            <React.Fragment key={bottle.id}>
              <div className="text-sm text-slate-400 flex justify-end">
                <div className="flex-grow">
                  {bottle.wine.producer} {bottle.wine.wineName} {bottle.vintage}{" "}
                  {bottle.rack} {bottle.shelf}{" "}
                  {bottle.noteCount > 0 && (
                    <Dialog>
                      <DialogTrigger>
                        <Badge
                          onClick={() =>
                            fetchNotes(bottle.wineId, bottle.vintage)
                          }
                          variant="default"
                          className="px-1.5"
                        >
                          {bottle.noteCount}
                        </Badge>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Notes</DialogTitle>
                          <DialogDescription className="text-primary text-base">
                            {bottle.vintage} {bottle.wine.producer}{" "}
                            {bottle.wine.wineName}
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
                                  {note.drinkFrom
                                    ? ` From ${note.drinkFrom}`
                                    : ""}
                                  {note.drinkTo ? ` To ${note.drinkTo}` : ""}
                                </CardContent>
                              </Card>
                            ))}
                          </ScrollArea>
                        )}
                        {notes.length === 0 && (
                          <Card>
                            <CardContent className="text-center ">
                              <p className="mt-6">
                                No notes found for this wine
                              </p>
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
                  )}
                </div>
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
                        <DropdownMenuItem onClick={addNote}>
                          Add note
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuSeparator />

                      {/* Show Notes Id */}
                      <DropdownMenuItem
                        onClick={() =>
                          toast.info(
                            `Bottle: ${bottle.id} , wine: ${bottle.wineId}`,
                            {
                              position: "top-center",
                            }
                          )
                        }
                      >
                        Show Ids
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {dialogType === "show" && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Notes</DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
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
                                {note.drinkFrom
                                  ? ` From ${note.drinkFrom}`
                                  : ""}
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Note</DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
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
                    <DialogContent className=" rounded-lg w-11/12">
                      <DialogHeader>
                        <DialogTitle className="-mt-2">
                          {bottleFormType === "E" ? "Edit" : "Add"} Bottle
                          <Separator className="mt-2" />
                        </DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
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
                  {/* {dialogType === "btlAddEdit" && (
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{bottleFormType} Bottle</DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
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
                  )} */}
                  {dialogType === "btlConsume" && (
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Consume Bottle</DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
                        </DialogDescription>
                      </DialogHeader>
                      <BottleConsumeForm
                        btl={{
                          id: bottle.id,
                          vintage: bottle.vintage,
                          rack: bottle.rack,
                          consume: undefined,
                          occasion: undefined,
                        }}
                        dialogClose={dialogClose}
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
                  {dialogType === "btlDelete" && (
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {bottleFormType} Bottle - delete
                        </DialogTitle>
                        <DialogDescription className="text-primary text-base">
                          {bottle.vintage} {bottle.wine.producer}{" "}
                          {bottle.wine.wineName}
                        </DialogDescription>
                      </DialogHeader>
                      <BottleDeleteForm
                        bid={bottle.id}
                        dialogClose={dialogClose}
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
                </Dialog>{" "}
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShowBottleMobile;
