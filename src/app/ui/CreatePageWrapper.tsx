"use server";
import { CreateForm } from "./forms/create_form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Category } from "../lib/utils/types_schemas/typesAndSchemas";
import { getAllCategories } from "../lib/db/firebase";

export default async function CreatePageWrapper() {
  const uid = cookies().get("user_id");
  if (!uid) {
    console.error("NO UID!");
    redirect("/");
  }
  const allCategories: Category[] = await getAllCategories(uid.value);
  return (
    <CreateForm
      categories={JSON.parse(JSON.stringify(allCategories))}
    ></CreateForm>
  );
}
