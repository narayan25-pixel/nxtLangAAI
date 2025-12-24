"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

type Sloka = any;

export default function useSlokas() {
  const [slokas, setSlokas] = useState<Sloka[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlokas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/api/getSlokas");
      setSlokas(resp.data?.data || []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch slokas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlokas();
  }, [fetchSlokas]);

  return { slokas, loading, error, refresh: fetchSlokas };
}