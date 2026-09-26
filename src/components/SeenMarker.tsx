"use client";

import { useEffect } from "react";
import { markJobsSeen } from "@/lib/storage";

export function SeenMarker({ ids }: { ids: string[] }) {
  useEffect(() => {
    if (ids.length) markJobsSeen(ids);
  }, [ids]);
  return null;
}
