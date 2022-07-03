import { db, auth } from "../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
  getAuth,
  inMemoryPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useStore } from "../store/store";

const { getState, setState } = useStore;

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
    let { email, password, name } = regdata;
    console.log(regdata);
    let user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
    let userData = await setDoc(doc(db, "users", user.user.uid), {
      name: name,
      email: email,
    });
    // add cid or uid afterwards
    console.log(user);
    console.log(userData);
    // let persistence = await setPersistence(auth, browserSessionPersistence);
    return { message: "Registered", user: user };
  } catch (err) {
    throw err;
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
      setState(userdata.data());
      return { message: "signed-in", user: user, userdata: userdata.data() };
    } else {
      return { message: "no data found" };
    }
  } catch (err) {
    throw err;
  }
};

// logout

export const logout = async () => {
  try {
    let user = await signOut(auth);
    console.log("logged-out", user);
    return { message: "logged-out", user: user || null };
  } catch (err) {
    throw err;
  }
};

// car details first time
// export const initBuyerProfile = async () => {
//   try {
//     let uid;
//     auth.onAuthStateChanged((user) => {
//       uid = user.uid;
//       console.log(uid);
//     });
//     console.log(uid);
//   } catch (err) {
//     throw err
//   }
// };

export const addSeller = async (sellerdata) => {
  try {
    let {
      stationName,
      portType,
      address,
      numberofports,
      amenities,
      longitude,
      latitude,
      type,
    } = sellerdata;
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    let sellerData = await setDoc(doc(db, "sellers"), {
      stationName: stationName,
      portType: portType,
      address: address,
      numberofports: numberofports,
      amenities: amenities,
      longitude: longitude,
      latitude: latitude,
      uid: uid,
      type,
    });
    let upUser = await updateDoc(doc(db, "users", uid), {
      isSeller: true,
    });
    return { message: "data set" };
  } catch (err) {
    throw err;
  }
};

//seller add image
export const sellerAddImage = async (file) => {
  try {
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    const storage = getStorage();
    let user = await getDoc(doc(db, "users", uid));
    const storageRef = ref(
      storage,
      `sellers/${uid}/${user.stationName}/images`
    );
    let upImage = await uploadBytes(storageRef, file);
    console.log(upImage);
    return { message: "File Uploaded" };
  } catch (err) {
    throw err;
  }
};

// seller add profileImage
export const sellerAddProfileImage = async (file) => {
  try {
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    const storage = getStorage();
    let user = await getDoc(doc(db, "users", uid));
    const storageRef = ref(
      storage,
      `sellers/${uid}/${user.stationName}/profileImage`
    );
    let upImage = await uploadBytes(storageRef, file);
    console.log(upImage);
    return { message: "File Uploaded" };
  } catch (err) {
    throw err;
  }
};

// get spec seller detail

export const getSpecSellerDetail = async (sellerData) => {
  try {
    console.log(auth.currentUser.uid);
    let sellerData = await getDoc(doc(db, "sellers", sellerData.sid));
    return { message: "Sellers found", sellerData: sellerData.data() };
  } catch (err) {
    throw err;
  }
};

// book spec seller details

// export const bookDetails = async (booking) => {
//   try {
//     let authedUser = getState().user;
//     if (!authedUser) throw "user not logged in";
//     let uid = authedUser.uid;
//   } catch (err) {
//     throw err;
//   }
// };

// get authed buyer dashboard // car details + all logs + recomd + number of hours left

// buy plan
export const buyPlan = async (buyerdata) => {
  try {
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    console.log(uid);
    let q = query(collection(db, "buyers"), where("uid", "==", uid));
    let getBuyerData = await getDocs(q);
    let docId;
    // not good code
    getBuyerData.forEach((doc) => {
      docId = doc.id;
    });
    let upBuyer = await updateDoc(doc(db, "buyers", docId), {
      subscription: buyerdata.subscription,
    });
    return { message: "Plan Booked!" };
  } catch (err) {
    throw err;
  }
};

// renew plan

// get plan

// hello
export const getAllSellers = async () => {
  try {
    console.log(getState().user);
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    let allSellers = await getDocs(collection(db, "sellers"));
    let sellerDetails = [];
    allSellers.forEach((doc) => {
      sellerDetails.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log(sellerDetails);
    return { message: "all sellers found", sellerData: sellerDetails };
  } catch (err) {
    throw err;
  }
};

export const addBuyer = async (buyerdata) => {
  try {
    let { brand, model, color, batteryType, isCharging } = buyerdata;
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;
    let uploadBuyer = await setDoc(doc(db, "buyers"), {
      brand: brand,
      model: model,
      color: color,
      batteryType: batteryType,
      isCharging: false,
      uid: uid,
    });
    let upUser = await updateDoc(doc(db, "users", uid), {
      isBuyer: true,
    });
    return { message: "data set" };
  } catch (err) {
    throw err;
  }
};

export const getTheState = async () => {
  let user = getState();
  console.log(
    "🚀 ~ file: auth.service.js ~ line 137 ~ getTheState ~ user",
    user
  );
};
