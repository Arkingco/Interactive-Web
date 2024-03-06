"use client";

import Key from "@/component/key";
import GeometryCircle from "@/ts/geometryCircle";
import React, { useEffect, useState } from "react";

export default function Home() {
  const keyboard = [
    [
      "ESC",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
    ],
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACK"],
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
    ["CTRL", "FN", "WIN", "ALT", "SPACE", "ALT", "CTRL"],
  ];

  const keyMappings = [
    [
      101, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 44, 145,
      19,
    ], // 16 keys
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 8], // 13 keys
    [9, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 46], // 15 keys
    [20, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 13], // 13 keys
    [16, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 16], // 12 keys
    [17, 0, 91, 18, 32, 18, 17, 37, 40, 39], // 10 keys
  ];

  const [text, setText] = useState("");
  const [graphic, setGraphic] = useState<GeometryCircle | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const divContainer = document.getElementById("container");
      if (divContainer) {
        setGraphic(new GeometryCircle(divContainer, text));
      }
    }
  }, []);

  useEffect(() => {
    if (graphic) {
      graphic.updateText(text);
    }
  }, [text]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 50) {
      return;
    }
    setText(e.target.value);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className=" bg-black h-full w-full flex flex-col ">
        <div id="container"></div>
        <input
          className="mx-[400px] px-[10px] rounded-xl bg-gray-800 font-bold text-green-500 text-5xl "
          onChange={onTextChange}
          value={text}
        ></input>
      </div>

      <div className="flex justify-center items-center">
        <div className=" bg-white opacity-80 w-[1100px] mt-5">
          {keyboard.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className=" w-full content-center justify-between flex p-1"
            >
              {row.map((key, keyIndex) => (
                <Key key={keyIndex} keyChar={key} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
