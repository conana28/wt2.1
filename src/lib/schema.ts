import { z } from "zod";

export const WineSearchSchema = z.object({
  //   search: z.string(),
  search: z.string().nonempty("Search is required."),
  //   message: z
  //     .string()
  //     .nonempty('Message is required.')
  //     .min(6, { message: 'Message must be at least 6 characters.' })
});

export const WineFormDataSchema = z.object({
  producer: z.string().min(1, "Producer is required."),
  wineName: z.string().min(1, "Wine name is required."),
  country: z.string().min(1, "Country is required."),
  region: z.string().min(1, "Region is required."),
  subRegion: z.string().optional(),
  type: z.string().optional(),
});

export const BottleSearchSchema = z.object({
  search: z.string().optional(),
  vintage: z.coerce.number().optional(),
  country: z.string().optional(),
  rack: z.string().optional(),
});

export const BottleFormSchema = z.object({
  vintage: z.coerce.number().min(1970, "Vintage is required."),
  rack: z.string().min(1, "Rack name is required."),
  shelf: z.string().optional(),
  cost: z.coerce.number().optional(),
  qty: z.coerce.number().min(1, "Qty must be 1 or more"),
});

export const BottleFormSchema1 = z.object({
  vintage: z.coerce.number().min(1970, "Vintage is required."),
  rack: z.string().min(1, "Rack name is required."),
  shelf: z.string().optional(),
  cost: z.coerce.number().optional(),
});

export const BottleConsumeFormSchema = z.object({
  consume: z.date(),
  occasion: z.string().optional(),
});
