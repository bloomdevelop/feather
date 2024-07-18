import { Server } from "revolt.js";
import { Accessor, createContext, createMemo, createSignal } from "solid-js";
import { RevoltClient } from "../client";

interface IServerContext {
  id: Accessor<string>;
  setId: (value: string) => void;
  server: Accessor<Server | undefined>;
  setServer: (value: Server | undefined) => void;
  updateServerBasedOnId: (id: string) => void;
}

const ServerContext = createContext<IServerContext>({
  id: () => "",
  setId: (value: string) => {
    console.log("Setting server id to " + value);
  },
  server: () => undefined,
  setServer: (value: Server | undefined) => {
    console.log("Setting server to " + value);
  },
  updateServerBasedOnId: (id: string) => {
    console.log("Updating server based on id " + id);
  },
});

function ServerProvider(props: any) {
  const [id, setId] = createSignal("");
  const [server, setServer] = createSignal<Server | undefined>(undefined);

  function updateServerBasedOnId(id: string) {
    const serverInCache = createMemo(() => RevoltClient.servers.get(id));
    setId(id);
    console.log(serverInCache);
    setServer(serverInCache);
  }

  return (
    <ServerContext.Provider
      value={{ id, setId, server, setServer, updateServerBasedOnId }}
    >
      {props.children}
    </ServerContext.Provider>
  );
}

export { ServerContext, ServerProvider };
