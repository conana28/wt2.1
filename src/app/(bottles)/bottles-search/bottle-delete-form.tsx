"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";

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
import { deleteBottle } from "@/actions/bottle";

import { toast } from "sonner";

interface BottleFormProps {
  bid: number;
  dialogClose: () => void;
}

export function BottleDeleteForm({ bid, dialogClose }: BottleFormProps) {
  // Define form.
  const form = useForm({});

  // submit handler.
  async function onSubmit() {
    const a = await deleteBottle(bid);
    form.reset();
    dialogClose();
  }

  function cancel() {
    console.log("Cancel");
    form.reset();
    dialogClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="text-base font-medium text-gray-300">
          [{bid}] This cannot be undone
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Button variant="destructive" size="xs" type="submit">
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
}
