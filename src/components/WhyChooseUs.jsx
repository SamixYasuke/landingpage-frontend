import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "./FeatureCard";
import { setActiveFeature } from "../features/whyChooseUs/whyChooseUsSlice";

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.whyChooseUs.features);
  const activeFeatureId = useSelector((state) => state.whyChooseUs.activeFeatureId);

  return (
    <section id="why-choose-us" className="container mx-auto px-4 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-gradient-to-b from-[#FC466B]/30 opacity-30 blur-3xl to-[#3F5EFB]/30" />

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Why{" "}
            <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            We pair elite engineering talent with a process built for speed,
            quality and security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              desc={feature.desc}
              isActive={feature.id === activeFeatureId}
              onSelect={() =>
                dispatch(
                  setActiveFeature(feature.id === activeFeatureId ? null : feature.id)
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
