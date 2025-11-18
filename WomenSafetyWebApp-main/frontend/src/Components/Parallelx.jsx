import React from "react";
import "../styles/parallelx.css";
import rotate from "../images/rotate.png";
import { Link } from "react-router-dom";
const Parallelx = () => {
  return (
    <div>
      <section className="more-info-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="img-section">
                <img src={rotate} alt="" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="more-info-content para-width">
                <h2 className="text-white fw-bold">Want To Know More?</h2>
                <h4 className="text-white fw-semibold">
                  Want To Know Who Is Behind This Initiative?
                </h4>
                <p className="text-white">
                  We at GUARDIAN SHIELD ensure that each and every person is secure and
                  that we can do our best to help you.
                </p>
                <div className="mt-4">
                  <Link className="learn-more-btn m-0" to="/about">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parallelx;
