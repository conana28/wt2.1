import React from "react";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  return (
    <div className="container mt-2">
      <h1>Auth session details</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default page;
