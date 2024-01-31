"use server";
import {
  Category,
  FoodItemSchema,
  FoodItemType,
} from "@/app/lib/utils/types_schemas/typesAndSchemas";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db_firebase } from "../firebase/firebase";
import { getDaysBetweenDates } from "../utils/datehelper";
import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";
import { generateId } from "../utils/tools";

export async function addItemToDB(newItem: FoodItemType, uid: string) {
  try {
    const docRef = doc(
      collection(db_firebase, `users/${uid}/items`),
      newItem._id
    );
    await setDoc(docRef, newItem);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding item to database:");
  }
}

export async function addCategoryToDB(newCategory: string, uid: string) {
  try {
    const stringTrimmedLower = newCategory.trim().toLowerCase();
    const stringParsed =
      stringTrimmedLower.charAt(0).toUpperCase() +
      stringTrimmedLower.substring(1);
    console.log(`Checking if category exists: ${stringParsed}`);
    const ref = doc(db_firebase, "users", uid, "categories", stringParsed);

    const exists = (await getDoc(ref)).exists();

    if (!exists) {
      console.log(
        `Category ${stringParsed} doesn't exist, adding ${stringParsed} to ${ref.path}`
      );
      await setDoc(ref, { name: stringParsed, id: generateId(10) });
    } else {
      console.log(`Category ${stringParsed} already exists, skipping`);
    }
  } catch (err) {
    console.error("Error trying to add category to database");
    console.log(err);
  }
}

export async function updateItem(
  itemId: string,
  formData: FormData,
  uid: string
) {
  try {
    // console.log("Updating new item: ");
    // const ob = Object.fromEntries(formData.entries());
    // console.log(ob);

    const freezeDate = new Date(formData.get("freezeDate") as string);
    const expirationDate = new Date(formData.get("expirationDate") as string);
    const lifeSpanInDays = getDaysBetweenDates(freezeDate, expirationDate);
    const item = FoodItemSchema.parse({
      name: formData.get("itemName"),
      category: formData.get("itemCategory"),
      freezeDate: freezeDate,
      expirationDate: expirationDate,
      lifespanInDays: lifeSpanInDays,
      volume: formData.get("itemVolume"),
      quantity: parseInt(formData.get("itemQuantity") as string),
      _id: formData.get("_id"),
    });

    try {
      const docRef = doc(
        collection(db_firebase, `users/${uid}/items`),
        item._id
      );
      console.log(docRef.id);

      await setDoc(docRef, item);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(console.error());
  }
  revalidatePath("/dashboard");
}

export async function EXAMPLE_getAllCategories(): Promise<Category[]> {
  try {
    const uid = "_EXAMPLE";

    const result = await getDocs(
      query(collection(db_firebase, "users", uid, "categories"))
    );
    var items: Category[] = [];
    result.forEach((item) => {
      const data = item.data();
      if (data as Category) {
        items.push(data as Category);
      } else {
        throw new Error(`Error trying to parse this object: ${data}`);
      }
    });
    return items;
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to fetch all EXAMPLE categories");
  }
}
export async function getAllCategories(uid: string): Promise<Category[]> {
  try {
    // const uid = cookies().get("user_id")!.value;

    const result = await getDocs(
      query(collection(db_firebase, "users", uid, "categories"))
    );
    var items: Category[] = [];
    result.forEach((item) => {
      const data = item.data();
      if (data as Category) {
        items.push(data as Category);
      } else {
        throw new Error(`Error trying to parse this object: ${data}`);
      }
    });
    return items;
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to fetch all USER categories");
  }
}

export async function getAllSorted(uid: string): Promise<FoodItemType[]> {
  try {
    // const uid = cookies().get("user_id")!.value;

    const itemsRef = collection(db_firebase, "users", uid, "items");
    const q = query(itemsRef, orderBy("expirationDate"));
    const querySnapshot = await getDocs(q);
    const items: FoodItemType[] = [];
    querySnapshot.forEach((el) => {
      const data = el.data();
      for (const [key, value] of Object.entries(data)) {
        if (key.endsWith("Date")) {
          data[key] = value.toDate();
        }
      }
      items.push(data as FoodItemType);
    });
    return items;
  } catch (error) {
    console.log(error);
    throw new Error("Database error while trying to retrieve all USER items");
  }
}
export async function EXAMPLE_getAllSorted(): Promise<FoodItemType[]> {
  try {
    const uid = "_EXAMPLE";

    const itemsRef = collection(db_firebase, "users", uid, "items");
    const q = query(itemsRef, orderBy("expirationDate"));
    const querySnapshot = await getDocs(q);
    const items: FoodItemType[] = [];
    querySnapshot.forEach((el) => {
      const data = el.data();
      for (const [key, value] of Object.entries(data)) {
        if (key.endsWith("Date")) {
          data[key] = value.toDate();
        }
      }
      items.push(data as FoodItemType);
    });
    return items;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Database error while trying to retrieve all EXAMPLE items"
    );
  }
}

export async function deleteCollectionAndSubcollections(
  collectionName: string,
  uid: string
) {
  console.log(`DELETING ALL ITEMS IN COLLECTION: ${collectionName}`);

  var iteration = 0;
  const itemDocs = await getDocs(
    collection(db_firebase, `users/${uid}/${collectionName}`)
  );
  const sizeBefore = itemDocs.size;
  itemDocs.forEach(async (doc) => {
    try {
      await deleteDoc(doc.ref);
      iteration++;
      if (iteration == sizeBefore) {
        console.log("NUMBER OF ITEMS DELETED: " + iteration);
      }
    } catch (error) {
      console.log(console.error());
      throw new Error("Error occurred while trying to delete an item");
    }
  });
  if (uid === "_EXAMPLE") {
    revalidatePath("/example");
  } else {
    revalidatePath("/dashboard");
  }
}
