import { Client } from "@repo/revolt.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SettingsContext } from "./contexts/settings";
import { useContext } from "solid-js";

const settingsContext = useContext(SettingsContext);

export const RevoltClient = new Client();

const genAIClient = new GoogleGenerativeAI(
  (settingsContext?.settings.experiments.get("aiAPIKey") as string) || ""
);

export const model = genAIClient.getGenerativeModel({
  model:
    (settingsContext?.settings.experiments.get("aiModel") as string) ||
    "gemini-1.5-pro",
});
// There's a bug that kills performance... Possibly memory leak???
