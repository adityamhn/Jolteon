import {
  getFirestore,
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
  getAuth,
  browserSessionPersistence,
  setPersistence,
  inMemoryPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const db = getFirestore();
const auth = getAuth();

export const register = async (regdata) => {
  try {
    let { email, password, name } = regdata;
    let user = await createUserWithEmailAndPassword(auth, email, password);
    let userData = await setDoc(doc(db, "users", user.user.uid), {
      name: name,
      email: email,
      isBuyer: true,
      isSeller: true,
    });
    let buyerData = await setDoc(
      doc(db, "buyers", Math.floor(Math.random() * 16777215).toString(32)),
      {
        brand: "Tesla",
        model: "X",
        color: "White",
        batteryType: "Cable C",
        isCharging: false,
        uid: user.user.uid,
        health: "Good",
        voltage: 325,
        etc: 3,
        subscription: "monthly",
        charge: 0.7,
      }
    );
    let sellerData = await setDoc(
      doc(db, "sellers", Math.floor(Math.random() * 16777215).toString(32)),
      {
        stationName: "Jolt Super",
        portType: "Cable C",
        address: "4th cross, 4th block, Koramangla",
        numberofports: 5,
        uid: user.user.uid,
        type: "station",
        fee: 100,
        amenities: ["wc", "rooms", "cafe"],
        power: "20",
        latitude: 0,
        longitude: 0,
      }
    );
    return { message: "Registered", user: user };
  } catch (err) {
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    let user = await signInWithEmailAndPassword(auth, email, password);
    let userdata = await getDoc(doc(db, "users", user.user.uid));
    if (userdata.exists()) {
      return { message: "signed-in", user: user, userdata: userdata.data() };
    } else {
      return { message: "no data found" };
    }
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    let user = await signOut(auth);
    return { message: "logged-out", user: user || null };
  } catch (err) {
    throw err;
  }
};

export const getAllSeller = async () => {
  try {
    let allSellers = await getDocs(collection(db, "sellers"));
    let sellerDetails = [];
    allSellers.forEach((doc) => {
      sellerDetails.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return { message: "Sellers found", sellerData: sellerDetails };
  } catch (err) {
    throw err;
  }
};

export const getSpecSeller = async (sellerData) => {
  try {
    let sellerData = await getDoc(doc(db, "sellers", sellerData.sid));
    return { message: "Sellers found", sellerData: sellerData.data() };
  } catch (err) {
    throw err;
  }
};

export const addSeller = async (sellerdata) => {
  try {
    let { stationName, portType, address, numberofports, type } = sellerdata;
    let uid = auth.currentUser.uid;
    let sellerData = await setDoc(doc(db, "sellers"), {
      stationName: stationName,
      portType: portType,
      address: address,
      numberofports: numberofports,
      uid: uid,
      type: type,
    });
    let upUser = await updateDoc(doc(db, "users", uid), {
      isSeller: true,
    });
    return { message: "data set" };
  } catch (err) {
    throw err;
  }
};

export const sellerAddProfileImage = async (file) => {
  try {
    let uid = auth.currentUser.uid;
    const storage = getStorage();
    let user = await getDoc(doc(db, "users", uid));
    const storageRef = ref(
      storage,
      `sellers/${uid}/${user.stationName}/profileImage`
    );
    let upImage = await uploadBytes(storageRef, file);

    return { message: "File Uploaded" };
  } catch (err) {
    throw err;
  }
};

export const buyPlan = async (buyerdata) => {
  try {
    let uid = auth.currentUser.uid;
    let q = query(collection(db, "buyers"), where("uid", "==", uid));
    let getBuyerData = await getDocs(q);
    let docId;
    getBuyerData.forEach((doc) => {
      docId = doc.id;
    });
    console.log(docId);
    console.log("hello", buyerdata.subscription);
    let upBuyer = await updateDoc(doc(db, "buyers", docId), {
      subscription: buyerdata.subscription,
    });
    return { message: "Plan Booked!" };
  } catch (err) {
    throw err;
  }
};

export const book = async (bookingData) => {
  try {
    let uid = auth.currentUser.uid;
    let sellerData = await getDoc(doc(db, "sellers", bookingData.sid));
    console.log(sellerData.data());
    let bookings = sellerData.data().bookings || [];
    bookings.push({
      fromtime: bookingData.fromtime,
      totime: bookingData.totime,
      status: bookingData.status,
      date: bookingData.date,
      uid: uid,
    });
    let upSellerData = await updateDoc(doc(db, "sellers", bookingData.sid), {
      bookings: bookings,
    });
    return { message: "Plan Booked!" };
  } catch (err) {
    throw err;
  }
};

export const getGarageDetails = async () => {
  try {
    let uid = auth.currentUser.uid;
    let q = query(collection(db, "buyers"), where("uid", "==", uid));
    let getBuyerData = await getDocs(q);

    let garageDetails = [];
    getBuyerData.forEach((doc) => {
      garageDetails.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return { message: "Garage Details Found", garageDetails: garageDetails[0] };
  } catch (err) {
    throw err;
  }
};

export const allBookingDetails = async () => {
  try {
    let uid = auth.currentUser.uid;
    let q = query(collection(db, "sellers"), where("uid", "==", uid));
    let getSellerData = await getDocs(q);
    let bookingDetails = [];
    let sellerData;
    getSellerData.forEach((doc) => {
      bookingDetails.push(doc.data()?.bookings);
      sellerData = doc.data();
    });

    return {
      message: "Booking Details Found",
      bookingDetails: bookingDetails,
      sellerData,
    };
  } catch (err) {
    throw err;
  }
};

export const getSelfSellerDetails = async () => {
  try {
    let uid = auth.currentUser.uid;
    let q = query(collection(db, "sellers"), where("uid", "==", uid));
    let getSellerData = await getDocs(q);
    let sellerData = [];
    getSellerData.forEach((doc) => {
      sellerData.push({
        stationName: doc.data().stationName,
        email: auth.currentUser.email,
        address: doc.data().address,
        portType: doc.data().portType,
        numberofports: doc.data().numberofports,
      });
    });
    if (sellerData.length == 0) {
      sellerData.push({
        stationName: "",
        email: "",
        address: "",
        portType: "",
        numberofports: "",
      });
    }
    console.log("hello babe", sellerData);
    return {
      message: "Booking Details Found",
      sellerData: sellerData[0],
    };
  } catch (err) {
    throw err;
  }
};

export const addBuyer = async (buyerdata) => {
  try {
    let { brand, model, color, batteryType, isCharging } = buyerdata;
    let uid = auth.currentUser.uid;
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
