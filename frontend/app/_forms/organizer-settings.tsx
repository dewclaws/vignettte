"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import { cc } from "@/lib/utilities";
import Link from "next/link";

const FormSchema = z.object({
  rename_media: z.boolean().optional(),
  name_format: z.string(),
  folder_format: z.string(),
});

export function OrganizerSettingsForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rename_media: true,
      name_format: "{movie.title[clean,capitalize,dotted]}",
      folder_format: "{movie.title[capitalize]} ({movie.year})",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[1200px] space-y-8"
      >
        <h4 className="mb-4 text-2xl font-medium">Organizer</h4>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="rename_media"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center px-2 gap-4 xl:gap-6 xl:grid xl:grid-cols-2 xl:items-center">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Rename Media Files
                  </FormLabel>
                  <FormDescription>
                    Format names of media files the organizer moves.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            disabled={!form.watch("rename_media")}
            control={form.control}
            name="name_format"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center px-2 gap-4 xl:gap-6 xl:grid xl:grid-cols-2 xl:items-center">
                <div
                  className={cc(
                    "space-y-0.5 transition-all duration-200",
                    field.disabled && "grayscale opacity-50",
                  )}
                >
                  <FormLabel className="text-base">
                    File Naming Format
                  </FormLabel>
                  <FormDescription>
                    The format to use when naming media files.{" "}
                    <Link
                      href="/help/formatting"
                      className="text-primary dark:text-indigo-400 underline hover:opacity-75"
                    >
                      Help?
                    </Link>
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    placeholder="{movie.title[clean,capitalize,dotted]}"
                    className="font-mono"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            disabled={!form.watch("rename_media")}
            control={form.control}
            name="folder_format"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center px-2 gap-4 xl:gap-6 xl:grid xl:grid-cols-2 xl:items-center">
                <div
                  className={cc(
                    "space-y-0.5 transition-all duration-200",
                    field.disabled && "grayscale opacity-50",
                  )}
                >
                  <FormLabel className="text-base">
                    Folder Naming Format
                  </FormLabel>
                  <FormDescription>
                    How movie folders should be named.{" "}
                    <Link
                      href="/help/formatting"
                      className="text-primary dark:text-indigo-400 underline hover:opacity-75"
                    >
                      Help?
                    </Link>
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    placeholder="{movie.title[capitalize]} ({movie.year})"
                    className="font-mono"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
