import Head from "next/head"
import styles from "@/styles/Home.module.css"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ChannelRecommendation from "@/ui-components/channel-recommendation";
import PredictViewsBySubs from "@/ui-components/predict-views-by-subs";
import PredictViewsByMultifactors from "@/ui-components/predict-views-by-multifactors";

export default function Home() {
  return (
    <>
      <Head>
        <title>WGU Capstone: Youtube project</title>
      </Head>
      <main className={styles.main}>
        <ChannelRecommendation />
        <PredictViewsBySubs />
        <PredictViewsByMultifactors />
      </main>
    </>
  )
}
