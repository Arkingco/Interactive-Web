"use client";

import { useEffect, useState } from "react";

interface Props {
  keyChar: string;
}

export default function Key({ keyChar }: Props) {
  const [pressedKeyCode, setPressedKeyCode] = useState<number | null>(null);
  // console.log(keyChar, pressedKeyCode);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeyCode(event.keyCode);
      console.log(event.keyCode);
    };

    const handleKeyUp = () => {
      setPressedKeyCode(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="p-1 bg-opacity-9 inline-block h-[50px] rounded-xl text-center font-bold text-8xl border-4 border-red-500">
      {keyChar}
    </div>
  );
}
