import { Channel } from "@repo/revolt.js";
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  on,
  Resource,
} from "solid-js";
import { RevoltClient } from "../client";

interface IChannelContext {
  id: Accessor<string>;
  setId: (value: string) => void;
  channel: Accessor<Channel | undefined>;
  setChannel: (value: Channel | undefined) => void;
  channelResource?: Resource<Channel | undefined>;
  refreshChannel?: () => void;
}

const ChannelContext = createContext<IChannelContext>({
  id: () => "",
  setId: (value: string) => {
    console.log("Setting channel id to " + value);
  },
  channel: () => undefined,
  setChannel: (value: Channel | undefined) => {
    console.log("Setting channel to " + value);
  },
});

function ChannelProvider(props: any) {
  const [id, setId] = createSignal("");
  const [channel, setChannel] = createSignal<Channel | undefined>(undefined);

  createEffect(
    on(id, async () => {
      if (id()) {
        const res = await RevoltClient.channels.fetch(id());
        setChannel(res);
      } else if (id() === "") setChannel(undefined);
      else setChannel(undefined);
    })
  );

  return (
    <ChannelContext.Provider value={{ id, setId, channel, setChannel }}>
      {props.children}
    </ChannelContext.Provider>
  );
}

export { ChannelContext, ChannelProvider };
