import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WineData, columns } from "./columns";

type Props = {
  wines: WineData[]; // Wines to display
};

export default function ShowTable1({ wines }: Props) {
  // Calculate the height based on the number of wine records
  const height = Math.min(wines.length * 5, 660) + 40;

  return (
    <>
      <ScrollArea className="h-72">
        {wines.map((wine) => (
          <div key={wine.id}>
            <div className="flex flex-row justify-between">
              <div className="">
                {wine.producer} {wine.wineName}
              </div>

              <div>...</div>
            </div>
          </div>
        ))}
      </ScrollArea>
      {/* ) : (
        <DataTable columns={columns} data={wines} />
      )} */}
    </>
  );
}
