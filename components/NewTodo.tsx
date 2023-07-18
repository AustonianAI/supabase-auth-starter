import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    "use server";
    // get title from input
    const title = formData.get("title");
    const supabase = createServerActionClient({ cookies });

    await supabase.from("todos").insert({ title });
    revalidatePath("/todo");
  };

  return (
    <form action={addTodo} className="bg-red-800 text-blue-500">
      <input name="title" placeholder="New Todo" />
    </form>
  );
}
