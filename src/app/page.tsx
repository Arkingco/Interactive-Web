"use client";

import Geometry from "@/ts/geometry";
import GeometryCircle from "@/ts/geometryCircle";
import Graphic from "@/ts/visual";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const divContainer = document.getElementById("container");
      if (divContainer) {
        new GeometryCircle(divContainer);
        console.log("hi");
      }
      console.log("tq");
    }
  }, []);

  return <div id="container"></div>;
}
