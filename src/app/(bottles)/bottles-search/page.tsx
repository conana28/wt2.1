"use client";

import React from "react";
import { z } from "zod";

import { BottleSearchSchema } from "@/lib/schema";
import { CellarSearchForm } from "./cellar-search-form";
import { ShowBottleTable } from "./show-bottle-table";
import ShowBottleMobile from "./show-bottle-mobile";

type searchInputs = z.infer<typeof BottleSearchSchema>;

const BottlesSearch = () => {
  const [searchData, setSearchData] = React.useState<searchInputs>();
  const [bottlesFound, setBottlesFound] = React.useState<any[]>([]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden sm:flex flex-1 space-x-4">
        <div className="w-1/5">
          <CellarSearchForm setBottlesFound={setBottlesFound} />
        </div>

        <div className="w-4/5">
          {/* {bottlesFound.length > 0 && ( */}
          <ShowBottleTable bottlesFound={bottlesFound} />
          {/* )} */}
        </div>
      </div>
      <div className="w-full md:hidden">
        <div>
          <CellarSearchForm setBottlesFound={setBottlesFound} />
        </div>
        {bottlesFound.length > 0 && (
          <div>
            <ShowBottleMobile bottlesFound={bottlesFound} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BottlesSearch;
