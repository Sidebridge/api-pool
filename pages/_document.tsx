import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
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
