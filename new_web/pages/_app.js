import React from "react";
import Head from "next/head";
import "../styles/globals.scss";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
import { NativeBaseProvider } from "native-base";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user, setUser } = useStore();
  useEffect(() => {
    console.log("hello");
    onAuthStateChanged(auth, (users) => {
      if (users) {
        console.log("this", user);
        setUser(users);
        router.replace("/user/dashboard");
      } else {
        setUser(null);
        router.replace("/");
      }
    });
  }, []);
  return (
    <NativeBaseProvider>
      <Head>
        <title>Jolteon | Your Smart EV Solution</title>
        <link rel="icon" href="/jolt.svg" />
      </Head>
      <Component {...pageProps} />
    </NativeBaseProvider>
  );
}

export default MyApp;
