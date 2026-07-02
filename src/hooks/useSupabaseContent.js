import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

export function useSupabaseList({ table, fallback = [], mapper, orderBy }) {
  const [items, setItems] = useState(fallback);
  const [isLoading, setIsLoading] = useState(Boolean(isSupabaseConfigured));

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending: false });

      if (!isMounted) return;
      if (!error && data?.length) setItems(data.map(mapper));
      setIsLoading(false);
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [fallback, mapper, orderBy, table]);

  return { items, isLoading };
}

export function useSupabaseItem({ table, slug, fallback = null, mapper }) {
  const [item, setItem] = useState(fallback);
  const [isLoading, setIsLoading] = useState(Boolean(isSupabaseConfigured));

  useEffect(() => {
    let isMounted = true;

    async function loadItem() {
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!isMounted) return;
      if (!error && data) setItem(mapper(data));
      setIsLoading(false);
    }

    setItem(fallback);
    setIsLoading(Boolean(isSupabaseConfigured));
    loadItem();

    return () => {
      isMounted = false;
    };
  }, [fallback, mapper, slug, table]);

  return { item, isLoading };
}
