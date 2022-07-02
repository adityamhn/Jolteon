import { db, auth } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const writeToDeviceCollection = async () => {
  await setDoc(doc(db, "devices", "device-1"), {
    name: "Jolteon",
    type: "Electric",
    color: "Yellow",
    age: "3",
  });
};
