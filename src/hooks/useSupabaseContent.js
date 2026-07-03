import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

const listCache = new Map();
const listRequests = new Map();

function getListCacheKey({ table, orderBy, select, limit }) {
  return JSON.stringify({ table, orderBy, select, limit });
}

export function useSupabaseList({
  table,
  fallback = [],
  mapper,
  orderBy,
  select = "*",
  limit,
}) {
  const cacheKey = getListCacheKey({ table, orderBy, select, limit });
  const cachedItems = listCache.get(cacheKey);
  const [items, setItems] = useState(cachedItems || fallback);
  const [isLoading, setIsLoading] = useState(Boolean(isSupabaseConfigured && !cachedItems));

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      const cached = listCache.get(cacheKey);
      if (cached) {
        setItems(cached);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      let request = listRequests.get(cacheKey);

      if (!request) {
        let query = supabase
          .from(table)
          .select(select)
          .order(orderBy, { ascending: false });

        if (typeof limit === "number") {
          query = query.limit(limit);
        }

        request = query.then(({ data, error }) => {
          if (error) return null;
          return (data || []).map(mapper);
        });

        listRequests.set(cacheKey, request);
      }

      const mappedItems = await request;
      listRequests.delete(cacheKey);

      if (!isMounted) return;

      if (mappedItems) {
        listCache.set(cacheKey, mappedItems);
        setItems(mappedItems);
      }

      setIsLoading(false);
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [cacheKey, limit, mapper, orderBy, select, table]);

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
