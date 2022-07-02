import Head from "next/head";
import "../styles/globals.scss";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jolteon | Your Smart EV Solution</title>
        <link rel="icon" href="/jolt.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
