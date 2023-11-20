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
import { BottleFormSchema } from "@/lib/schema";
import { useContext } from "react";
import { Context } from "./show-table";
import { addBottle } from "@/actions/bottle";

type BottleFormValues = z.infer<typeof BottleFormSchema>;

interface BottleFormProps {
  formType: string;
  id: number; // wine id
}

export function BottleForm({ formType, id }: BottleFormProps) {
  const { show, setShow, wine } = useContext(Context);
  const defaultValues: Partial<BottleFormValues> = {
    vintage: 2020,
    rack: "",
    shelf: "",
    cost: 0,
    qty: 1,
  };
  const form = useForm<BottleFormValues>({
    resolver: zodResolver(BottleFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BottleFormValues) {
    console.log("Submit ", data);

    if (data.qty === 1) {
      const result = await addBottle(data, id);

      if (!result) {
        alert("Something went wrong - Add Wine");
        return;
      }
    } else if (data.qty > 1) {
      const results = await Promise.all(
        Array.from({ length: data.qty }, () => addBottle(data, id))
      );

      if (results.some((result) => !result)) {
        alert("Something went wrong - Add Multiple Wine");
        return;
      }
    }

    // const result = await addBottle(data, id);
    // if (!result) {
    //   alert("Something went wrong - Add Wine");
    //   return;
    // }

    // if (result.error) {
    //   // set local error state
    //   alert(result.error);
    //   return;
    // }

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
              name="vintage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vintage</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
              name="rack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rack</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="shelf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shelf</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qty</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
            {/* {formType === "A" ? "Add" : "Edit"} */}
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
