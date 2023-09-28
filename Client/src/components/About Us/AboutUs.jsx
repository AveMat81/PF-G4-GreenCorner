import { useEffect } from "react";
import "../About Us/AboutUs.css";
import Aos from "aos";
import "aos/dist/aos.css";
import plantsAbout from "../../img/plantsAbout.jpg";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div>
      <br />

      <br />
      <section
        className="relative  bg-green-200 p-4 h-[400px] sm:p-8 md:p-12 lg:p-16 xl:p-20"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="flex-1">
          <img
            src={plantsAbout}
            alt=""
            className=" relative p-4  h-[500px] mt-[-60px] w-[900px] ml-[-70px] "
          />
        </div>

        <div className="flex-1">
          <strong className="relative p-4 l-[650px] text-[24px] ml-[820px] text-green-700 -top-[480px]">
            We believe that a world full of plants is a better world.
          </strong>
        </div>
        <div className="flex-1">
          <p className=" relative p-4 l-[650px] ml-[820px] -top-[480px] text-[20px]">
            We want to become your favorite place for everything related to the
            world of plants: from different types of plants, designer pots and
            accessories, to advice and personalized care programs.
          </p>
        </div>

        <div className="flex-1">
          <strong className="relative p-4 l-[650px] ml-[810px] -top-[450px] text-[15.4px]">
            Our mission is to help you find your perfect plant to transform your
            environments into stylish spaces, full of life and warmth.💚
          </strong>
        </div>
      </section>

      <section
        className="relative bg-red-200  p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 "
        style={{ height: "auto" }}
        data-aos="fade-left"
        data-aos-duration="1000"
      ></section>
    </div>
  );
};
export default AboutUs;
