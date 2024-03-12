"use client";

import React, {useEffect, useState} from "react";
import {SearchIcon} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[] | undefined;
  }[];
}

const ServerSearch = ({data}: ServerSearchProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    }
  }, []);

  const onClick = ({id, type}: { id: string, type: "channel" | "member" }) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
        <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
            ⌘
          </span>
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
            K
          </span>
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members"/>
        <CommandList>
          <CommandEmpty>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No results found
            </p>
          </CommandEmpty>
          {data.map(({label, type, data}) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({id, icon, name}) => {
                  return (
                    <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default ServerSearch;
