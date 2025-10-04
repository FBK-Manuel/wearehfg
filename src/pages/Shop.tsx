import React, { Suspense, lazy } from "react";
// import React from "react";
import SearchBarGrid from "../components/SearchBarGrid";
import SkeletonCard from "../components/SkeletonCard";
// import TodayDeal from "../components/TodayDeal";
// import FeaturedProducts from "../components/FeaturedProduct";
// import ProductSlider from "../components/ProductSlider";
// import GridShowcase from "../components/GridShowCase";
// import SkeletonCard from "./SkeletonCard";

const Shop: React.FC = () => {
  const ProductSlider = lazy(() => import("../components/ProductSlider"));
  const TodayDeal = lazy(() => import("../components/TodayDeal"));
  const FeaturedProducts = lazy(() => import("../components/FeaturedProduct"));
  const GridShowcase = lazy(() => import("../components/GridShowCase"));

  // Render multiple skeletons for slider effect
  const skeletons = Array.from({ length: 4 });
  return (
    <div className="min-h-screen">
      {/* shop layout */}
      <div className="">
        <SearchBarGrid />

        {/* product slider modal */}
        <div className="mt-10">
          <div>
            <Suspense
              fallback={
                <div className="w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skeletons.map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </div>
              }
            >
              <ProductSlider />
            </Suspense>
          </div>
        </div>

        {/* todays deal modal */}
        <div className="mt-10">
          <div>
            <Suspense
              fallback={
                <div className="w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skeletons.map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </div>
              }
            >
              {/* <ProductSlider /> */}
              <TodayDeal />
            </Suspense>
          </div>
        </div>

        {/* featured Product modal */}
        <div className="mt-10">
          <div>
            <Suspense
              fallback={
                <div className="w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skeletons.map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </div>
              }
            >
              {/* <ProductSlider /> */}
              <FeaturedProducts />
            </Suspense>
          </div>
        </div>

        {/* grid showcase modal */}
        <div className="mt-10">
          <div>
            <Suspense
              fallback={
                <div className="w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skeletons.map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </div>
              }
            >
              {/* <ProductSlider /> */}
              <GridShowcase />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
