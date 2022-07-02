import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

export const writeToDeviceCollection = async () => {
  await setDoc(doc(db, "devices", "device-1"), {
    name: "Jolteon",
    type: "Electric",
    color: "Yellow",
    age: "3",
  });
};

//register

export const register = async (regdata) => {
  try {
    let {
      email,
      password,
      fname,
      lname,
      address,
      phoneNumber,
      isSeller,
      isBuyer,
    } = regdata;
    let user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
    let userData = await setDoc(doc(db, "users", user.user.uid), {
      fname: fname,
      lname: lname,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      isSeller: isSeller,
      isBuyer: isBuyer,
    });
    // add cid or uid afterwards
    console.log(user);
    console.log(userData);
    // let persistence = await setPersistence(auth, browserSessionPersistence);
    return { message: "Registered", user: user };
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};

// signin

export const login = async (email, password) => {
  try {
    let persistence = await setPersistence(auth, browserSessionPersistence);
    console.log(persistence);
    let user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    let userdata = await getDoc(doc(db, "users", user.user.uid));
    if (userdata.exists()) {
      console.log("Document data:", userdata.data());
      return { message: "signed-in", user: user, userdata: userdata.data() };
    } else {
      return { message: "no data found" };
    }
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};

// signout

export const logout = async () => {
  try {
    let user = await signOut(auth);
    return { message: "logged-out", user: user || null };
  } catch (err) {
    return { code: err.code, message: err.message };
  }
};
