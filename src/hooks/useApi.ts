import { useEffect, useState } from "react";
import { getApi } from "../api";

export function useApi<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getApi<T>(path)
      .then((payload) => {
        if (active) setData(payload);
      })
      .catch(() => {
        if (active) setData(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [path]);

  return { data, loading };
}
