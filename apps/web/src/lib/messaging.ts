import { Message } from "revolt.js";
import { createSignal } from "solid-js";

export const [messageSignal, setMessageSignal] = createSignal<Message[]>([]);
