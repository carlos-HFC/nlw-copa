"use server";

import { api } from "@/services/api";

interface CreatePoolRequest {
  title: string;
}

interface CreatePoolResponse {
  data: {
    code: string;
  };
}

export async function createPool(params: CreatePoolRequest): Promise<CreatePoolResponse> {
  const response = await api.post('/pools', params);

  const data = await response.json();

  return {
    data
  };
}