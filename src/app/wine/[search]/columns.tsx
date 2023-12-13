"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Bottle } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Context } from "./show-table";

// import screens from "../../../../tailwind.config";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WineData = {
  id: number;
  producer: string;
  wineName: string;
  country: string;
  region: string;
  subRegion: string | null;
  type: string | null;
  bottle: Array<Bottle | []>;
  // bottle: Array<Bottle>;
};

export const columnsMob: ColumnDef<WineData>[] = [
  {
    id: "name",
    header: "Matching wine",
    accessorFn: (row) => `${row.producer} ${row.wineName}`,
  },
  {
    accessorKey: "bottle.length",
    header: () => <div className="text-center">Btls</div>,
    cell: function Cell({ row }) {
      return <div className="text-center">{row.original.bottle.length}</div>;
    },
  },

  {
    id: "actions",
    header: () => <div className="text-right"></div>,
    cell: function Cell({ row }) {
      const [open, setOpen] = useState(false);
      const { setShow, setWine } = useContext(Context);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className=" h-1 w-1 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("E");
                    setWine(row.original);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                {/* <DropdownMenuItem onClick={() => setOpenAddModal(true)}> */}
                <DropdownMenuItem
                  onClick={() => {
                    setShow("A");
                    setWine(row.original);
                  }}
                >
                  Add Like
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("D");
                    setWine(row.original);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("S");
                    setWine(row.original);
                  }}
                >
                  Show bottles
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("B");
                    setWine(row.original);
                  }}
                >
                  Add bottle
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];

export const columns: ColumnDef<WineData>[] = [
  // {
  //   accessorKey: "producer",
  //   header: "Producer",
  // },
  // {
  //   accessorKey: "wineName",
  //   header: "Wine Name",
  // },
  {
    id: "name",
    header: "Matching wine",
    accessorFn: (row) => `${row.producer} ${row.wineName}`,
  },
  // ...(isLargeScreen
  //   ? [
  {
    accessorKey: "country",
    header: "Country",
  },
  //     ]
  //   : []),
  // ...(isLargeScreen
  //   ? [
  {
    accessorKey: "region",
    header: "Region",
  },
  //   ]
  // : []),
  {
    accessorKey: "bottle.length",
    header: () => <div className="text-center">Btls</div>,
    cell: function Cell({ row }) {
      return <div className="text-center">{row.original.bottle.length}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    // cell: ({ row }) => {
    cell: function Cell({ row }) {
      // console.log("Id: ", row);
      // const wine = row.original;
      const [open, setOpen] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openAddModal, setOpenAddModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);

      const { show, setShow, setWine } = useContext(Context);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={show !== ""}>
              <Button variant="ghost" className="float-right mr-2 h-8 w-8 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("E");
                    setWine(row.original);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                {/* <DropdownMenuItem onClick={() => setOpenAddModal(true)}> */}
                <DropdownMenuItem
                  onClick={() => {
                    setShow("A");
                    setWine(row.original);
                  }}
                >
                  Add Like
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("D");
                    setWine(row.original);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("S");
                    setWine(row.original);
                  }}
                >
                  Show bottles
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("B");
                    setWine(row.original);
                  }}
                >
                  Add bottle
                </DropdownMenuItem>
              </DialogTrigger>

              {/* <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setWhichDialog("view")}>
                  View wine details
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  onClick={() => setWhichDialog("")}
                >
                  Clip
                </DropdownMenuItem>
              </DialogTrigger> */}
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* {open && openEditModal && (
            <EditWineModal
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              wine={row.original}
            />
          )} */}

          {/* {show && openAddModal && <ShowCard />} */}

          {/* {open && openAddModal && (
            <AddWineModal
              isOpen={openAddModal}
              onClose={() => setOpenAddModal(false)}
              wine={row.original}
            />
          )} */}

          {/* {open && openDeleteModal && (
            <DeleteWineModal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              wine={row.original}
            />
          )} */}
        </Dialog>
      );
    },
  },
];
