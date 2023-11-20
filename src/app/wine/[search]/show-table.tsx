"use client";

import React, { createContext, use, useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { WineData, columns, columnsMob } from "./columns";
import { ShowCard } from "./show-card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  wines: WineData[];
};

type TFOContext = {
  show: string;
  setShow: (show: string) => void;
  wine: WineData;
  setWine: (wine: WineData) => void;
};

export const Context = createContext<TFOContext>({
  show: "",
  setShow: () => "",
  wine: {
    id: 0,
    producer: "",
    wineName: "",
    country: "",
    region: "",
    subRegion: "",
    type: "",
    bottle: [],
  },
  setWine: () => {},
});

export default function ShowTable({ wines }: Props) {
  // const showtable = ({ wines }: Props) => {
  const [isLargeScreen, setisLargeScreen] = useState(true);
  const [show, setShow] = useState("");
  const [wine, setWine] = useState<WineData>({
    id: 0,
    producer: "",
    wineName: "",
    country: "",
    region: "",
    subRegion: "",
    type: "",
    bottle: [],
  });

  useEffect(() => {
    function handleResize() {
      setisLargeScreen(window.innerWidth > 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let dynamicHeight = "";

  switch (wines.length) {
    case 1:
      dynamicHeight = "20";
      break;
    case 2:
      dynamicHeight = "28";
      break;
    case 3:
      dynamicHeight = "36";
      break;
    case 4:
      dynamicHeight = "44";
      break;
    default:
      dynamicHeight = "52";
  }

  return (
    <Context.Provider value={{ show, setShow, wine, setWine }}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className={`w-full sm:w-2/3 ${show !== "" ? "opacity-40" : ""}`}>
          {!isLargeScreen && (
            <ScrollArea className={`w-92 rounded-md border h-${dynamicHeight}`}>
              <DataTable columns={columnsMob} data={wines} />
            </ScrollArea>
          )}
          {isLargeScreen && <DataTable columns={columns} data={wines} />}
        </div>
        {show !== "" && (
          <div className="w-full sm:w-1/3 ">
            <ShowCard formType={show} id={wine.id} />
          </div>
        )}
      </div>
    </Context.Provider>
  );
}
