"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WineFormDataSchema } from "@/lib/schema";
import { addWine, updateWine } from "@/actions/wine";
import { useContext } from "react";
import { Context } from "./show-table";
import { Edit } from "lucide-react";

type WineFormValues = z.infer<typeof WineFormDataSchema>;

interface WineFormProps {
  formType: string;
  id: number;
}

export function WineForm({ formType, id }: WineFormProps) {
  const { show, setShow, wine } = useContext(Context);
  const defaultValues: Partial<WineFormValues> = {
    producer: wine.producer,
    wineName: wine.wineName,
    country: wine.country,
    region: wine.region,
    subRegion: wine.subRegion || undefined,
    type: wine.type || undefined,
  };
  const form = useForm<WineFormValues>({
    resolver: zodResolver(WineFormDataSchema),
    defaultValues,
  });

  async function onSubmit(data: WineFormValues) {
    console.log("Submit ", data);
    let result;
    if (formType === "A") {
      result = await addWine(data);
    } else {
      result = await updateWine(data, wine.id);
    }

    if (!result) {
      alert("Something went wrong - Add Wine");
      return;
    }

    if (result.error) {
      // set local error state
      alert(result.error);
      return;
    }

    setShow("");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="producer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producer</FormLabel>
                  <FormControl>
                    <Input placeholder="producer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="wineName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wine name</FormLabel>
                  <FormControl>
                    <Input placeholder="Wine name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="subRegion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub region</FormLabel>
                  <FormControl>
                    <Input placeholder="Sub region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button size="xs" variant="secondary" onClick={() => setShow("")}>
            Cancel
          </Button>
          <Button size="xs" type="submit">
            {formType === "A" ? "Add" : "Edit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
