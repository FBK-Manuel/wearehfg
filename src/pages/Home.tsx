import React from "react";
// import HeroSection from "../components/home/HeroSection";
import HomeProduct from "../components/home/HomeProduct";
// import TextSlider from "../components/home/TextSlider";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import ImageSlider from "../components/home/ImageSlider";
import HeroFirstSection from "../components/home/HeroFirstSection";

const Home: React.FC = () => {
  return (
    <div>
      <div className="">
        <HeroFirstSection />
      </div>
      {/* Hero section */}
      {/* <div className="">
        <HeroSection />
      </div> */}
      {/*  Todays deal product section*/}
      <div className="flex-1 container mx-auto px-4 py-6">
        <HomeProduct />
      </div>
      {/* about there church shooting online with a text slide */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {/* <TextSlider /> */}
      </div>
      {/* about church */}
      <div>
        <AboutSection />
      </div>

      {/* contact us home page */}
      <div className="py-10">
        <ContactSection />
      </div>
      {/* image gallary */}
      <div>
        <ImageSlider />
      </div>
    </div>
  );
};

export default Home;
