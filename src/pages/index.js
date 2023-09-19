import Head from "next/head";
import Header from "@/components/Header";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="favicon" />
      </Head>
      <Header />
    </div>
  );
}
