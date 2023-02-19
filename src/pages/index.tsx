import Head from "next/head"
import styles from "@/styles/Home.module.css"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ChannelRecommendation from "@/ui-components/channel-recommendation";
import PredictViewsBySubs from "@/ui-components/predict-views-by-subs";
import PredictViewsByMultifactors from "@/ui-components/predict-views-by-multifactors";
import ChartSubscribersPerViews from "@/ui-components/subscribers-per-views";
import { IChannel } from "@/db/services/channels";
import { useCallback, useEffect, useState } from "react";
import { isMockEnabled } from "@/helpers/config";
import { get } from "lodash";
import mockAllChannels from "@/ui-components/__mocks__/mock-all-channels";
import axios from "axios";
import { clientUrls } from "@/helpers/client-urls";
import CardProgress from "@/ui-components/card-progress";
import { ChartGroupByViewsCategory } from "@/ui-components/group-by-category-views";

export default function Home() {
  const [channels, setChannels] = useState<Array<IChannel>>([]);

  const fetchChannels = useCallback(async (from = 0) => {
    if (isMockEnabled) {
      setChannels(get(mockAllChannels, "data", []) as Array<IChannel>);
    } else {
      const response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_CHANNELS}?from=${from}&to=1000`
      });
      setChannels(get(response, "data.data", []) as Array<IChannel>);
    }
  }, [setChannels]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);
  return (
    <>
      <Head>
        <title>WGU Capstone: Youtube project</title>
      </Head>
      {channels.length === 0 && <CardProgress />}
      {channels.length > 0 &&
        <main className={styles.main}>
          <ChartSubscribersPerViews channels={channels} />
          <ChartGroupByViewsCategory channels={channels} />
          <ChannelRecommendation channels={channels} />
          <PredictViewsBySubs />
          <PredictViewsByMultifactors />
        </main>
      }
    </>
  )
}
