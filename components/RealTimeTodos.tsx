"use client";

import React, { useEffect } from "react";
import Todo from "./Todo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function RealTimeTodos({ todos }: { todos: Todo[] }) {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime-todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return todos.map((todo: Todo) => (
    <li key={todo.id}>
      <Todo todo={todo} />
    </li>
  ));
}
