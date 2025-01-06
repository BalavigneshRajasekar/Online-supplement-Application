/* eslint-disable no-unused-vars */
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Offers() {
  const image = [
    { url: "banner1.jpg" },
    { url: "banner2.jpg" },
    { url: "banner3.jpg" },
  ];
  return (
    <div className="m-4">
      <Slide autoplay arrows={false}>
        {image.map((fadeImage, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", height: "400px" }}
              src={fadeImage.url}
            />
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Offers;
