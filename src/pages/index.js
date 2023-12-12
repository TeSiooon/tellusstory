import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Fragment } from "react";
import StoriesList from "@/components/stories/StoriesList";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Tell Us Story</title>
        <meta name="TUS" description="Browse stories around the world" />
      </Head>
      <StoriesList />
    </Fragment>
  );
}
