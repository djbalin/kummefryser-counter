export async function createItem(formData: FormData) {
  console.log("Creating new item: ");

  const ob = Object.fromEntries(formData.entries());
  console.log(ob);
  // revalidatePath("/dashboard");
  // redirect("/dashboard");
}
