import React, { useContext } from "react";
import { Context } from "./show-table";
import { Button } from "@/components/ui/button";

const NotesCard = () => {
  const { wine, setShow } = useContext(Context);

  if (wine.notes === null) {
    return (
      <div>
        <div className="text-primary text-xl">
          There are no notes for this wine
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" size="xs" onClick={() => setShow("")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <p>{wine.notes}</p>
      <div className="flex items-center justify-end space-x-4">
        <Button size="xs" variant="secondary" onClick={() => setShow("")}>
          Return
        </Button>
      </div>
    </>
  );
};

export default NotesCard;
