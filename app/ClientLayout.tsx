"use client";

import { useState } from "react";
import Loader from "@/components/common/Loader";


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onFinish={() => setLoading(false)} />
      ) : (
        <div className="fade-in">{children}</div>
      )}
    </>
  );
}
