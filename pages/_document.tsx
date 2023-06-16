import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="../assets/images/illustrations/dashboard-snapshot.svg"
          as="image"
        ></link>
      </Head>
      <body
        className="w-screen overflow-x-hidden bg-body"
        suppressHydrationWarning={true}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
