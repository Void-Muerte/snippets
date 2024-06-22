"use client";
import Editor from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetPropType {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetPropType) {
  const [code, setCode] = useState(snippet.code);
  const [title, setTitle] = useState(snippet.title);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetActions = actions.editSnippet.bind(
    null,
    snippet.id,
    code,
    title
  );

  return (
    <div>
      <div className="flex flex-col items-end gap-2 py-4 min-w-[670px]">
        <div className="flex justify-start w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border  rounded focus:outline-blue-300 py-1 px-2"
          />
        </div>
        <Editor
          height="40vh"
          theme="vs-dark"
          language="javascript"
          defaultValue={snippet.code}
          options={{ minimap: { enabled: false } }}
          onChange={handleEditorChange}
        />
        <form action={editSnippetActions}>
          <button className="px-2 py-1 border rounded hover:text-blue-300 hover:border-blue-300">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
