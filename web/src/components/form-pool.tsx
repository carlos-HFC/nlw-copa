"use client";

import { FormEvent, useState } from "react";

import { createPool } from "@/data/create-pool";

export function FormPool() {
  const [pool, setPool] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await createPool({
        title: pool
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert("Bolão criado com sucesso");

      setPool("");
    } catch (error) {

    }
  }

  return (
    <form
      className="mt-10 flex gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
        type="text"
        required
        placeholder="Qual o nome do seu bolão?"
        value={pool}
        onChange={e => setPool(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-700 px-6 py-4 rounded font-bold uppercase text-gray-900 text-sm"
      >
        Criar meu bolão
      </button>
    </form>
  );
}