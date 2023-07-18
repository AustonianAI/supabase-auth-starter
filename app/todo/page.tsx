import NewTodo from "@/components/NewTodo";
import RealTimeTodos from "@/components/RealTimeTodos";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ServerComponent() {
  // // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .match({ is_complete: false });

  return (
    <div>
      <p className="text-2xl text-center text-red-500">Hello!</p>
      <NewTodo />
      <br />
      {todos && (
        <ul className="text-white">
          <RealTimeTodos todos={todos ?? []} />
        </ul>
      )}
    </div>
  );
}
