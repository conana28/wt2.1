"use client";

import React, { useEffect, useState } from "react";

import { CellarSearchForm } from "../cellar-search-form";
import { ShowBottleTable } from "../show-bottle-table";
import ShowBottleMobile from "../show-bottle-mobile";
// import { usePathname, useSearchParams } from "next/navigation";

const BottlesSearch = ({ params }: { params: { search: string } }) => {
  // console.log("params", params.search);
  // const [searchTerm, setSearchTerm] = useState<string>(params.search);
  const [bottlesFound, setBottlesFound] = React.useState<any[]>([]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden sm:flex flex-1 space-x-4">
        <div className="w-1/5">
          <CellarSearchForm
            setBottlesFound={setBottlesFound}
            searchTerm={params.search}
          />
        </div>

        <div className="w-4/5">
          {/* {bottlesFound.length > 0 && ( */}
          <ShowBottleTable bottlesFound={bottlesFound} />
          {/* )} */}
        </div>
      </div>
      {/* Mobile View */}
      <div className="w-full md:hidden">
        <div>
          <CellarSearchForm
            setBottlesFound={setBottlesFound}
            searchTerm={params.search}
          />
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
