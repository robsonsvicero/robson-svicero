import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

export function useSupabaseList({
  table,
  fallback = [],
  mapper,
  orderBy,
  select = "*",
  limit,
}) {
  const [items, setItems] = useState(fallback);
  const [isLoading, setIsLoading] = useState(Boolean(isSupabaseConfigured));

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      let query = supabase
        .from(table)
        .select(select)
        .order(orderBy, { ascending: false });

      if (typeof limit === "number") {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!isMounted) return;

      if (!error) {
        setItems((data || []).map(mapper));
      }

      setIsLoading(false);
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [limit, mapper, orderBy, select, table]);

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
