import { addBottle } from "@/actions/bottle";
import { addWine } from "@/actions/wine";
import { BottleFormSchema1, WineFormDataSchema } from "@/lib/schema";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function Convert() {
  // Read wines
  //   let file = await fs.readFile(
  //     process.cwd() + "/src/app/data/wines.json",
  //     "utf8"
  //   );
  //   const wines = JSON.parse(file);

  //   type In = z.infer<typeof WineFormDataSchema>;

  //   let count = 0;
  //   for (const w of wines) {
  //     const newWine: In = {
  //       producer: w.producer,
  //       wineName: w.wineName,
  //       country: w.country,
  //       region: w.region,
  //       subRegion: w.subRegion,
  //       type: w._id.$oid,
  //     };
  //     const result = await addWine(newWine);
  //     console.log(result?.data);

  //
  // Read bottles
  // let file = await fs.readFile(
  //   process.cwd() + "/src/app/data/bottles.json",
  //   "utf8"
  // );
  // const bottles = JSON.parse(file);

  // type In = z.infer<typeof BottleFormSchema1>;

  // let count = 0;
  // for (const b of bottles) {
  //   console.log(b.wine.$oid);
  //   // Search wine for type = b.wine.$oid
  //   const wine = await prisma.wine.findFirst({
  //     where: { type: b.wine.$oid },
  //   });

  //   if (wine) {
  //     console.log(wine.id, wine.producer, wine.wineName);
  //     // Add bottle
  //     const newBottle: In = {
  //       vintage: b.vintage,
  //       rack: b.rack,
  //       shelf: b.shelf,
  //       cost: b.cost,
  //     };
  //     const result = await addBottle(newBottle, wine.id);
  //     console.log(result?.data);
  //   } else {
  //     console.log("Wine not found");
  //   }

  // Remove wineId from type
  //set the type field in the wine table to empty
  // const wines = await prisma.wine.findMany();
  // for (const w of wines) {
  //   const result = await prisma.wine.update({
  //     where: { id: w.id },
  //     data: { type: "" },
  //   });
  //   console.log(result);
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-2xl font-bold text-center">Wines.json</h1>
      <div>
        {/* {wines.map((wine: any, index: number) => (
          <div
            key={wine._id.$oid}
            className="flex flex-col items-center justify-between"
          >
            <h1 className="text-xl font-bold text-center">
              {wine._id.$oid} {wine.producer} {wine.wineName}
            </h1>
          </div>
        ))} */}
      </div>
    </main>
  );
}
