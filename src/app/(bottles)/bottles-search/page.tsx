"use client";

import React, { useEffect, useState } from "react";

import { CellarSearchForm } from "./cellar-search-form";
import { ShowBottleTable } from "./show-bottle-table";
import ShowBottleMobile from "./show-bottle-mobile";
import { usePathname, useSearchParams } from "next/navigation";

const BottlesSearch = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );
  const [bottlesFound, setBottlesFound] = React.useState<any[]>([]);
  // const pathname = usePathname();

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`;
  //   console.log(url);
  //   setSearchTerm(searchParams.get("search") || "");
  // }, [pathname, searchParams]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden sm:flex flex-1 space-x-4">
        <div className="w-1/5">
          <CellarSearchForm
            setBottlesFound={setBottlesFound}
            searchTerm={searchTerm}
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
            searchTerm={searchTerm}
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
