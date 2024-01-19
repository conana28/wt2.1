"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BottleSearchSchema } from "@/lib/schema";
import { searchBottles1 } from "@/actions/bottle";
import { Card } from "@/components/ui/card";
import { TBottle } from "@/types/bottle";
import { useEffect, useRef, useState } from "react";
import { set } from "date-fns";

// pass a prop to the form to set the bottlesFound state in the parent component
type Props = {
  setBottlesFound: React.Dispatch<React.SetStateAction<TBottle[]>>;
};

export function CellarSearchForm({ setBottlesFound }: Props) {
  const [loading, setLoading] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      setSecondsElapsed(0);
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((seconds) => seconds + 1);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [loading]);

  // 1. Define form.
  const form = useForm<z.infer<typeof BottleSearchSchema>>({
    resolver: zodResolver(BottleSearchSchema),
    defaultValues: {
      search: "",
      country: "",
      rack: "",
      vintage: "", // this is a string but the schema expects a number
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof BottleSearchSchema>) {
    // form.reset();
    console.log(values);
    setLoading(true);
    const btls = await searchBottles1(values);
    console.log(btls);
    if (btls && btls.bottlesWithNoteCount) {
      setBottlesFound(btls.bottlesWithNoteCount);
    }
    setLoading(false);
  }

  function cancel() {
    form.reset();
    setBottlesFound([]);
    setLoading(false);
    setSecondsElapsed(0);
  }

  return (
    <div className="">
      <Card className="">
        <h1 className="text-base font-semibold ml-4 my-2">Search cellar</h1>
        {loading && (
          <div className="text-center text-primary text-xl">
            Loading...{secondsElapsed}
          </div>
        )}
        {/* <Separator className="bg-slate-600 mb-2" /> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 md:space-y-6 px-2"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Wine</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Wine name"
                      className="text-lg md:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Country</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Country"
                      className="text-lg md:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vintage"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Vintage</FormLabel> */}
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Vintage"
                      className="text-lg md:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rack"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Rack</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Rack"
                      className="text-lg md:text-sm"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center pb-4">
              <Button type="button" variant="icon" size="icon" onClick={cancel}>
                <XCircle />
              </Button>{" "}
              <Button type="submit" variant="icon" size="icon">
                <Search />
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
