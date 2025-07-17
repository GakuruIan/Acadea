import React from "react";

import Spinner from "../spinner/spinner";

const Loader = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <Spinner size="sm" />
    </div>
  );
};

export default Loader;
