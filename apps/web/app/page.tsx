import React from "react";

import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center gap-2 p-8">
      <Link
        href="/onboarding"
        className="dark:bg-neutral-800/30 border dark:border-neutral-500/20 gap-x-4 rounded-lg h-64 w-full flex items-center justify-center text-lg font-semibold"
      >
        Onboarding
      </Link>
      {/* <div className="dark:bg-neutral-800/30 border dark:border-neutral-500/20 gap-x-4 rounded-lg h-64 w-full"></div>
      <div className="dark:bg-neutral-800/30 border dark:border-neutral-500/20 gap-x-4 rounded-lg h-64 w-full"></div> */}
    </div>
  );
};

export default page;
