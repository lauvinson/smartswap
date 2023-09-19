import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="Byte Swap" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Byte Swap" />
        <meta
          name="description"
          content="A Decentralised Finance (DeFi) app with features such as swap, cross chain swap, streaming, vesting, and permissionless market making for liquidity providers."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-180x180.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/metamask.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/metamask.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/metamask.png" color="#fffffff" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://byte.exchange" />
        <meta name="twitter:title" content="Byte Swap" />
        <meta
          name="twitter:description"
          content="A Decentralised Finance (DeFi) app with features such as swap, cross chain swap, streaming, vesting, and permissionless market making for liquidity providers."
        />
        <meta name="twitter:image" content="https://byte.exchange/apple-touch-icon-180x180.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Byte Swap" />
        <meta
          property="og:description"
          content="A Decentralised Finance (DeFi) app with features such as swap, cross chain swap, streaming, vesting, and permissionless market making for liquidity providers."
        />
        <meta property="og:site_name" content="Byte Swap" />
        <meta property="og:url" content="https://byte.exchange" />
        <meta property="og:image" content="https://byte.exchange/apple-touch-icon-180x180.png" />
        {/*<link rel="icon" href="/favicon.png" />*/}
      </Head>
      {/*  Prevent excessive sliding and tend to be native */}
      <body className={'overflow-hidden fixed w-full h-full'}>
        <div className={'overflow-y-auto h-full overscroll-y-none'}>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
