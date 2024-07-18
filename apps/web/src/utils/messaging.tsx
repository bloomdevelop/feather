import { Message } from "revolt.js";
import { createSignal } from "solid-js";

const [messageSignal, setMessageSignal] = createSignal<Message[]>([]);

export { messageSignal, setMessageSignal };
