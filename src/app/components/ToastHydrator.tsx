"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ToastHydrator() {
  useEffect(() => {
    const stored = sessionStorage.getItem("toast");
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      const { type, message, showed } = data;

      if (showed) return;

      if (type === "success") toast.success(message);
      else if (type === "error") toast.error(message);
      else toast(message);

      sessionStorage.setItem(
        "toast",
        JSON.stringify({ ...data, showed: true })
      );
    } catch {
      toast(stored);
      sessionStorage.removeItem("toast");
    }
  }, []);

  return null;
}
