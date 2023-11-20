import React, { useContext } from "react";
import { Context } from "./show-table";
import { Button } from "@/components/ui/button";
import { deleteWine } from "@/actions/wine";

const DeleteCard = () => {
  const { wine, setShow } = useContext(Context);

  const handleDelete = async () => {
    console.log("Delete: ", wine.id);
    const result = await deleteWine(wine.id);
    if (!result) {
      alert("Something went wrong with wine delete");
      return;
    }

    if (result.error) {
      // set local error state
      alert(result.error);
      return;
    }
    setShow("");
  };

  if (wine.bottle.length > 0) {
    return (
      <div>
        <div className="text-red-500 text-2xl">
          Delete not allowed - Bottles exist
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
      <div className="text-red-500 text-2xl">Are you sure? </div>
      <div className="flex items-center justify-end space-x-4">
        <Button size="xs" variant="secondary" onClick={() => setShow("")}>
          Cancel
        </Button>
        <Button size="xs" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteCard;
