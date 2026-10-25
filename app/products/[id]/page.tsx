import ProductPage from "@/app/components/Sections/ProductPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductPage />
    </Suspense>
  );
}
