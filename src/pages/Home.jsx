import Coupons from "../components/sharedLayoutComponents/home/Coupons";
import AboutBuilding from "../components/sharedLayoutComponents/home/AboutBuilding";
import BannerSlider from "../components/sharedLayoutComponents/home/bannerSlider";
import React from "react";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <AboutBuilding />
      <Coupons />
    </div>
  );
};

export default Home;
