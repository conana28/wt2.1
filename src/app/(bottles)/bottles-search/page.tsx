"use client";

import React, { createContext } from "react";

import { CellarSearchForm } from "./cellar-search-form";
import { ShowBottleTable } from "./show-bottle-table";
import ShowBottleMobile from "./show-bottle-mobile";
import { TBottle } from "@/types/bottle";

type TBSContext = {
  bottlesFound: TBottle[];
  setBottlesFound: (bottles: TBottle[]) => void;
  updateBottlesFoundArray?: (bottle: TBottle, action: Action) => void;
  bottleToEdit: TBottle | undefined;
  setBottleToEdit: (bottle: TBottle) => void;
};

export const BottlesSearchContext = createContext<TBSContext>({
  bottlesFound: [],
  setBottlesFound: () => {},
  updateBottlesFoundArray: () => {},
  bottleToEdit: {} as TBottle,
  setBottleToEdit: () => {},
});

type Action = "E" | "A" | "D";

const BottlesSearch = () => {
  const [bottlesFound, setBottlesFound] = React.useState<TBottle[]>([]);
  const [bottleToEdit, setBottleToEdit] = React.useState<TBottle>();
  const updateBottlesFoundArray = (updatedBottle: TBottle, action: Action) => {
    console.log(action, updatedBottle);
    const bottleExists = bottlesFound.some(
      (btl) => btl.id === updatedBottle.id
    );
    console.log(bottleExists);
    if (bottleExists) {
      if (action === "E") {
        setBottlesFound(
          bottlesFound.map((btl) =>
            btl.id === updatedBottle.id ? updatedBottle : btl
          )
        );
      }
      if (action === "D") {
        setBottlesFound(
          bottlesFound.filter((btl) => btl.id !== updatedBottle.id)
        );
      }
    }
    // Add a new bottle to Array
    if (action === "A") {
      const updatedBottles = [...bottlesFound, updatedBottle];
      updatedBottles.sort((a, b) => {
        // Sort by producer
        const producerComparison = a.wine.producer.localeCompare(
          b.wine.producer
        );
        if (producerComparison !== 0) return producerComparison;

        // If producers are the same, sort by wineName
        const wineNameComparison = a.wine.wineName.localeCompare(
          b.wine.wineName
        );
        if (wineNameComparison !== 0) return wineNameComparison;

        // If wineNames are the same, sort by vintage
        return a.vintage - b.vintage;
      });

      setBottlesFound(updatedBottles);
    }

    // if (wineExists) {
    //   // If the wine exists, update it
    //   setWinesFound(
    //     winesFound
    //       .map((wine) => (wine.id === updatedWine.id ? updatedWine : wine))
    //       .sort((a, b) => {
    //         // Sort by producer
    //         const producerComparison = a.producer.localeCompare(b.producer);
    //         if (producerComparison !== 0) return producerComparison;

    //         // If producers are the same, sort by wineName
    //         return a.wineName.localeCompare(b.wineName);
    //       })
    //   );
    // } else {
    //   // If the wine doesn't exist, add it
    //   setWinesFound(
    //     [...winesFound, updatedWine].sort((a, b) => {
    //       // Sort by producer
    //       const producerComparison = a.producer.localeCompare(b.producer);
    //       if (producerComparison !== 0) return producerComparison;

    //       // If producers are the same, sort by wineName
    //       return a.wineName.localeCompare(b.wineName);
    //     })
    //   );
    // }
  };

  return (
    <BottlesSearchContext.Provider
      value={{
        bottlesFound,
        setBottlesFound,
        updateBottlesFoundArray,
        bottleToEdit,
        setBottleToEdit,
      }}
    >
      <div>
        {/* Desktop View */}
        <div className="hidden sm:flex flex-1 space-x-4">
          <div className="w-1/5">
            <CellarSearchForm searchTerm="" />
          </div>

          <div className="w-4/5">
            <ShowBottleTable />
          </div>
        </div>
        {/* Mobile View */}
        <div className="w-full md:hidden">
          <div>
            {/* <CellarSearchForm setBottlesFound={setBottlesFound} searchTerm="" /> */}
          </div>
          {bottlesFound.length > 0 && (
            <div>
              <ShowBottleMobile bottlesFound={bottlesFound} />
            </div>
          )}
        </div>
      </div>
    </BottlesSearchContext.Provider>
  );
};

export default BottlesSearch;
