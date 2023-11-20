"use client";

import { useContext, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Context } from "./show-table";
import { WineForm } from "./wine-form";
import { BottleForm } from "./bottle-form";
import DeleteCard from "./delete-card";
import ShowBottles from "./show-bottles";
import { Bottle } from "@prisma/client";

interface CharacterDisplayProps {
  formType: string;
  id: number;
}

export function ShowCard({ formType, id }: CharacterDisplayProps) {
  console.log("ShowCard: ", formType, id);
  const { wine } = useContext(Context);
  const [wine1, setWine1] = useState(wine);
  // const [bottle, setBottle] = useState<Bottle | null>(null);
  // const [updatedBottle, setUpdatedBottle] = useState<Bottle | null>(null);
  // const [deletedBottle, setDeletedBottle] = useState(0);
  const updateBottle = (updatedBottle: Bottle) => {
    setWine1((prevWine) => {
      const newBottles = prevWine.bottle.map((bottle) =>
        bottle &&
        typeof bottle === "object" &&
        "id" in bottle &&
        bottle.id === updatedBottle.id
          ? updatedBottle
          : bottle
      );
      return { ...prevWine, bottle: newBottles };
    });
  };

  const addBottle = (addBottle: Bottle) => {
    setWine1((prevWine) => {
      const newBottles = [...prevWine.bottle, addBottle];
      return { ...prevWine, bottle: newBottles };
    });
  };

  const deleteBottle = (deletedBottleId: number) => {
    setWine1((prevWine) => {
      const newBottles = prevWine.bottle.filter(
        (bottle) =>
          bottle &&
          typeof bottle === "object" &&
          "id" in bottle &&
          bottle.id !== deletedBottleId
      );
      return { ...prevWine, bottle: newBottles };
    });
  };

  let title = "";
  switch (formType) {
    case "A":
      title = "Add Wine Like";
      break;
    case "E":
      title = "Edit Wine";
      break;
    case "D":
      title = "Delete Wine";
      break;
    case "S":
      title = "Show bottles";
      break;
    case "B":
      title = "Add bottle(s)";
      break;
    default:
      title = "Wine Details";
      break;
  }
  return (
    <Card className="dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="-mt-2">{title}</CardTitle>
        <CardDescription>
          {wine.producer} {wine.wineName}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="-mt-4">
        {formType === "A" && <WineForm formType={formType} id={id} />}
        {formType === "E" && <WineForm formType={formType} id={id} />}
        {formType === "D" && <DeleteCard />}
        {formType === "S" && (
          <ShowBottles
            wine={wine1}
            updateBottle={updateBottle}
            addBottle={addBottle}
            deleteBottle={deleteBottle}
          />
        )}
        {formType === "B" && <BottleForm formType="A" id={id} />}
      </CardContent>
    </Card>
  );
}
