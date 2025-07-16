import React from "react";

import Spinner from "../spinner/spinner";

const Loader = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <Spinner variant="sm" />
    </div>
  );
};

export default Loader;
