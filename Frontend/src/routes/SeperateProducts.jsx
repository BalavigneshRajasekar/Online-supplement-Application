/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";

function SeperateProducts() {
  const params = useParams();
  return (
    <div>
      <h1>{params.name}</h1>
    </div>
  );
}

export default SeperateProducts;
