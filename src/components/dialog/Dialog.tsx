import React, { useRef } from "react";
import Style from "./Dialog.module.css";

export type DialogProps = {
  container: JSX.Element;
};

export default function Dialog(props: DialogProps) {
  const { container } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   rootRef.current?.animate(
  //     [
  //       { opacity: 0, transform: "translateY(10px)" },
  //       { opacity: 1, transform: "translateY(0)" },
  //     ],
  //     { duration: 200, easing: "ease-in-out" }
  //   );
  // });

  return (
    <div ref={rootRef} className={Style.Dialog}>
      {container}
    </div>
  );
}
