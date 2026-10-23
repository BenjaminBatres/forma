import ShopAllSection from "@/app/components/Sections/ShopAllSection";
import React, { Suspense } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <ShopAllSection />
      </Suspense>
    </>
  );
}
