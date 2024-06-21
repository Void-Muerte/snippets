import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    "use server";

    // Check user's input and make sure its valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Create a new record in a database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);

    // Redirect the user back to home
    redirect("/");
  }
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border focus:outline-blue-200 rounded p-2 w-full"
            id="title"
            required
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 focus:outline-blue-200 w-full"
            id="code"
            required
          />
        </div>
        <button className="rounded p-2 bg-blue-200" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
