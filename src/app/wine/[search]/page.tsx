import { searchWines } from "@/actions/wine";
import Container from "@/components/ui/container";
import ShowTable from "./show-table";

// Gets the search param from the URL and passes it to the searchWines function
// which returns the results from the DB

const page = async ({ params }: { params: { search: string } }) => {
  console.log("params", params.search);
  // Get Data from DB
  const result = await searchWines({ search: params.search });

  if (!result?.wines) {
    console.log("Search wines went wrong", params.search);
    return;
  }

  return (
    <div className="container mt-2">
      <ShowTable wines={result.wines} />
    </div>
  );
};

export default page;
