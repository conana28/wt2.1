"use server";

import { z } from "zod";
import { WineFormDataSchema, WineSearchSchema } from "@/lib/schema";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof WineSearchSchema>;

export async function searchWines(data: Inputs) {
  const result = WineSearchSchema.safeParse(data);
  console.log("Parse: ", result);
  if (result.success) {
    try {
      const wines = await prisma.wine.findMany({
        where: {
          OR: [
            {
              producer: { contains: result.data.search, mode: "insensitive" },
            },
            {
              wineName: { contains: result.data.search, mode: "insensitive" },
            },
          ],
        },
        include: {
          bottle: {
            where: {
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
              occasion: true,
              consume: true,
              createdAt: true,
              updatedAt: true,
              wineId: true,
            },
          },
        },

        // include: { bottle: true },
        // where: {
        //   OR: [
        //     {
        //       producer: { contains: result.data.search, mode: "insensitive" },
        //     },
        //     {
        //       wineName: { contains: result.data.search, mode: "insensitive" },
        //     },
        //   ],
        // },

        orderBy: [{ producer: "asc" }, { wineName: "asc" }],
      });
      return { wines };
    } catch (error) {
      console.log(error);
      return { error };
    }
    // return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

type In = z.infer<typeof WineFormDataSchema>;

// Add Wine
export async function addWine(data: In) {
  const result = WineFormDataSchema.safeParse(data);
  console.log("Parse", result);

  if (result.success) {
    // Add to DB
    const wine = await prisma.wine.create({
      data: {
        producer: result.data.producer,
        wineName: result.data.wineName,
        country: result.data.country,
        region: result.data.region,
        subRegion: result.data.subRegion,
        type: result.data.type,
        notes: result.data.notes,
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

// Update Wine
export async function updateWine(data: In, id: number) {
  const result = WineFormDataSchema.safeParse(data);
  // console.log("Parse", result);

  if (result.success) {
    // Add to DB
    const wine = await prisma.wine.update({
      where: { id },
      data: {
        producer: result.data.producer,
        wineName: result.data.wineName,
        country: result.data.country,
        region: result.data.region,
        subRegion: result.data.subRegion,
        type: result.data.type,
        notes: result.data.notes,
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

// Delete Wine
export async function deleteWine(id: number) {
  try {
    await prisma.wine.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Fetch count of all wines
export async function getWineCount() {
  const wineCount = await prisma.wine.count();
  return wineCount;
}
