import React, { CSSProperties } from "react";

const Icon = ({ size = "140px" }: { size?: CSSProperties["width"] }) => {
  return (
    <img
      src="/images/logos/FabAID.svg"
      alt="FabAID"
      aria-label="FabAID"
      style={{ width: size, height: "auto", display: "block" }}
    />
  );
};

export default Icon;