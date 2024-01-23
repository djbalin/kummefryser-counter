"use client";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuthContext } from "../contexts/auth_context";
import { Button } from "./button";
import { db_firebase } from "../lib/firebase/firebase";
import { FoodItemType } from "../types_schemas/typesAndSchemas";
import { Auth, getAuth } from "firebase/auth";
import { middleware } from "../../middleware";
import { NextResponse } from "next/server";
import { cookiesTest } from "../lib/actions";
import { useEffect } from "react";

// import user

export default function Login() {
  const { user, googleSignIn, logOut } = useAuthContext();
  const cUser = getAuth().currentUser;
  console.log("login render");

  // useEffect(() => {
  //   console.log("Useeffect ran");

  //   setSignInCookie(user!);
  // }, [user]);

  function handleSignIn() {
    googleSignIn();
    // const signInUser =  googleSignIn();
    // await setSignInCookie(signInUser);
    // if (user) {
    //   setSignInCookie(user);
    // } else {
    //   console.log("no user");
    // }
    // setSignInCookie(googleSignIn());
  }

  async function fakeAddData() {
    const foodItem: FoodItemType = {
      _id: "fakeitemid2",
      name: "fakeitemname2",
      category: "new category2",
      freezeDate: new Date(),
      expirationDate: new Date(),
      lifespanInDays: 30,
      volume: "3030ml",
      quantity: 2,
    };
    try {
      const docRef = doc(
        collection(db_firebase, "/users/", user!.uid, "/items")
      );
      console.log(docRef);

      await setDoc(docRef, { ...foodItem, id: docRef.id });
      //   await addDoc(docRef, { ...foodItem, id: docRef.id });
      //   await addDoc(collection(db_firebase, "items"), foodItem);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getDocsOfUser() {
    try {
      const querySnapshot = await getDocs(
        collection(db_firebase, "/users/", user!.uid, "/items")
      );
      //    query(
      //     collection(db_firebase, "/users/", user!.uid, "/items")
      //   );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (e) {
      console.log("error getting docs");
      console.log(e);
    }
  }

  return (
    <div className="">
      <Button onClick={(e) => handleSignIn()}>LOGIN</Button>
      <Button onClick={(e) => logOut()}>LOG OUT</Button>
      <Button onClick={(e) => fakeAddData()}>Fake add data</Button>
      <Button onClick={(e) => getDocsOfUser()}>Get docs of user</Button>
      <Button onClick={() => cookiesTest()}>cookietest</Button>

      {user ? (
        <span>
          Logged in as user: {user.displayName} {user.uid} {cUser!.tenantId}
        </span>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
}
