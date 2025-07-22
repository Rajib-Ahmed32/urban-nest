import Coupons from "../components/sharedLayoutComponents/home/Coupons";
import AboutBuilding from "../components/sharedLayoutComponents/home/AboutBuilding";
import BannerSlider from "../components/sharedLayoutComponents/home/bannerSlider";
import React from "react";
import BuildingMap from "../components/sharedLayoutComponents/home/BuildingMap";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <AboutBuilding />
      <Coupons />
      <BuildingMap />
    </div>
  );
};

export default Home;
