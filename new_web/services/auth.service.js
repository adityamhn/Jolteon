import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
  inMemoryPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useStore } from "../store/store";

const { getState } = useStore;

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
    let { stationName, portType, address, numberofports, amenities } =
      sellerdata;
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = autheduser.uid;
    let sellerData = await setDoc(doc(db, "sellers"), {
      stationName: stationName,
      portType: portType,
      address: address,
      numberofports: numberofports,
      amenities: amenities,
      longitude: longitude,
      latitude: latitude,
      uid: uid,
    });
    return { message: "data set" };
  } catch (err) {
    throw err;
  }
};
// hello
export const getAllSellers = async () => {
  try {
    console.log(getState().user);
    let authedUser = getState().user;
    if (!authedUser) throw "user not logged in";
    let uid = authedUser.uid;

    return { message: "data set" };
  } catch (err) {
    throw err;
  }
};

const authedUser = async () => {
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        resolve("hello");
      } else {
        reject("no user found");
      }
    });
  });
};

export const getTheState = async () => {
  let user = getState();
  console.log(
    "🚀 ~ file: auth.service.js ~ line 137 ~ getTheState ~ user",
    user
  );
};
