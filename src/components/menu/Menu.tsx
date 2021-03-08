import React, { useLayoutEffect, useRef } from "react";
import Style from "./Menu.module.css";

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    root?.animate(
      [
        {
          transform: "scale(0, 0)",
        },

        {
          transform: "scale(1, 1)",
        },
      ],
      200
    );
  });

  return (
    <div ref={ref} className={Style.Menu}>
      MENU
    </div>
  );
}
