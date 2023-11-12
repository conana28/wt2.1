import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

/**
 * The `container` class in Tailwind CSS centers the content of the element horizontally
 * and limits its width to a maximum value.
 */
const Wine = async () => {
  const session = await auth();

  if (!session?.user) {
    // redirect("/api/auth/signin?callbackUrl=/wine");
    redirect("/api/auth/signin");
  }

  return <div className="container mt-2 bg-red-400">Wine</div>;
};

export default Wine;
