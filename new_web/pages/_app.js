import React from "react";
import Head from "next/head";
import "../styles/globals.scss";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/router";
import { NativeBaseProvider } from "native-base";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { getState } = useStore;
  const { user, setUser } = useStore();
  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      if (users) {
        console.log(users);
        setUser(users.uid);

        if (["/", "/login", "/register"].includes(router.pathname)) {
          router.push("/user/dashboard");
        }
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
