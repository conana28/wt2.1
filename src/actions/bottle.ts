"use server";

import { z } from "zod";
import {
  BottleFormSchema1,
  BottleSearchSchema,
  BottleConsumeFormSchema,
} from "@/lib/schema";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof BottleSearchSchema>;

export async function searchBottles(data: Inputs) {
  const result = BottleSearchSchema.safeParse(data);
  // console.log(result);
  if (result.success) {
    // console.log(result.data);
    try {
      const bottles = await prisma.bottle.findMany({
        where: {
          wine: {
            OR: [
              {
                producer: {
                  contains: result.data.search,
                  mode: "insensitive",
                },
              },
              {
                wineName: {
                  contains: result.data.search,
                  mode: "insensitive",
                },
              },
            ],
            AND: [
              {
                country: {
                  contains: result.data.country,
                  mode: "insensitive",
                },
              },
            ],
          },

          rack: {
            contains: result.data.rack,
            mode: "insensitive",
          },

          // vintage: {
          //   equals: result.data.vintage,
          // },
          // You can use "equals" to filter by a specific rack, or "equals" or "in" for an array of racks.
          consume: {
            equals: null,
          },
        },

        select: {
          id: true,
          vintage: true,
          rack: true,
          shelf: true,
          cost: true,
          wine: {
            select: {
              id: true,
              producer: true,
              wineName: true,
              country: true,
            },
          },
        },
        orderBy: {
          vintage: "asc",
        },
      });

      if (!bottles) {
        console.log("Bottle - Something went wrong");
        return;
      }
      return { bottles };
    } catch (error) {
      return { error };
    }
    // return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

type In = z.infer<typeof BottleFormSchema1>;

export async function addBottle(data: In, id: number) {
  const result = BottleFormSchema1.safeParse(data);
  console.log("Parse Bottle", result, "Id", id);

  if (result.success) {
    // Add to DB
    const wine = await prisma.bottle.create({
      data: {
        vintage: result.data.vintage,
        rack: result.data.rack,
        shelf: result.data.shelf === "" ? null : result.data.shelf,
        cost: result.data.cost === 0 ? null : result.data.cost,
        wineId: id,
      },
    });
    revalidatePath("/");
    return { success: true, data: wine };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export async function updateBottle(data: In, id: number) {
  const result = BottleFormSchema1.safeParse(data);
  console.log("Parse", result);

  if (result.success) {
    // Add to DB
    const btl = await prisma.bottle.update({
      where: { id },
      data: {
        vintage: result.data.vintage,
        rack: result.data.rack,
        shelf: result.data.shelf === "" ? null : result.data.shelf,
        cost: result.data.cost === 0 ? null : result.data.cost,
        occasion: result.data.occasion === "" ? null : result.data.occasion,
        consume: result.data.consume === undefined ? null : result.data.consume,
      },
    });
    revalidatePath("/");
    return { success: true, data: result.data };
  }
}
export async function consumeBottle(
  data: z.infer<typeof BottleConsumeFormSchema>,
  id: number
) {
  const result = BottleConsumeFormSchema.safeParse(data);
  console.log("Parse", result);

  if (result.success) {
    // Add to DB
    const btl = await prisma.bottle.update({
      where: { id },
      data: {
        consume: result.data.consume,
        occasion: result.data.occasion,
      },
    });
    // Revalidate data
    revalidatePath("/");
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export async function deleteBottle(id: number) {
  console.log("Delete bottle", id);
  try {
    await prisma.bottle.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}