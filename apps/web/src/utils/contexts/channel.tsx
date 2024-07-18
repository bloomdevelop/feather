import { Channel } from "revolt.js";
import { Accessor, createContext, createMemo, createSignal } from "solid-js";
import { RevoltClient } from "../client";

interface IChannelContext {
  id: Accessor<string>;
  setId: (value: string) => void;
  channel: Accessor<Channel | undefined>;
  setChannel: (value: Channel | undefined) => void;
  updateChannelBasedOnId: (id: string) => void;
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
  updateChannelBasedOnId: (id: string) => {
    console.log("Updating channel based on id " + id);
  },
});

function ChannelProvider(props: any) {
  const [id, setId] = createSignal("");
  const [channel, setChannel] = createSignal<Channel | undefined>(undefined);
  function updateChannelBasedOnId(id: string) {
    const channelInCache = createMemo(() => RevoltClient.channels.get(id));
    setId(id);
    console.log(channelInCache);
    console.log("Channel's ID:", channelInCache()?.id);
    setChannel(channelInCache);
  }
  return (
    <ChannelContext.Provider
      value={{ id, setId, channel, setChannel, updateChannelBasedOnId }}
    >
      {props.children}
    </ChannelContext.Provider>
  );
}

export { ChannelContext, ChannelProvider };
