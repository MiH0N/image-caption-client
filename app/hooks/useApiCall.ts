"use client";

import { useState } from "react";
import api from "../libs/api";
import { IImagePrompt } from "@/types/entity";

interface UseApiCallOptions {
  endpoint: string;
  responseKey: string;
  errorMessage: string;
}

export function useApiCall({
  endpoint,
  responseKey,
  errorMessage,
}: UseApiCallOptions) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: IImagePrompt) => {
    setLoading(true);
    setError(null);
    setResponse([]);

    try {
      const formData = new FormData();
      formData.append("file", values.image!);
      formData.append("tone", values.tone);
      formData.append("language", values.language?.code || "en");
      formData.append("context", values?.context || "");
      formData.append("model_name", values.model);

      const result = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data && Array.isArray(result.data[responseKey])) {
        setResponse(result.data[responseKey]);
      } else {
        setError("پاسخ نامعتبر از سرور دریافت شد");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    handleSubmit,
  };
}
