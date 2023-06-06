import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head></Head>
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
