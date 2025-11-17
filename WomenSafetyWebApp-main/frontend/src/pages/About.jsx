import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "120px" }}>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <h2 className="fw-bold">Our Story</h2>
              <p>
                GUARDIAN SHIELD is here for your safety
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
