import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";
import { sanitizeRichText } from "../utils/richText.js";

export function useAutosave({ table, id, field = "content", value, enabled = true, delay = 2200 }) {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!enabled || !id || !isSupabaseConfigured) {
      setStatus("idle");
      return undefined;
    }

    const timer = window.setTimeout(async () => {
      setStatus("saving");
      const nextValue = field === "content" ? sanitizeRichText(value || "") : value;
      const { error } = await supabase.from(table).update({ [field]: nextValue || null }).eq("id", id);
      setStatus(error ? "error" : "saved");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay, enabled, field, id, table, value]);

  return status;
}