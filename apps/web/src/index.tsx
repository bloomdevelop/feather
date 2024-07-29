/* @refresh reload */
import { render } from "solid-js/web";
import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import { Route, Router } from "@solidjs/router";
import { AuthProvider } from "./lib/contexts/auth";
import baseLayout from "./layouts/baseLayout";
import serverLayout from "./layouts/serverLayout";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import "./index.css";
import serverPage from "./routes/server";
import { ServerProvider } from "./lib/contexts/server";
import { ChannelProvider } from "./lib/contexts/channel";
import NotFound from "./routes/notFound";
import settingsPage from "./routes/settings";
import { SettingsProvider } from "./lib/contexts/settings";
import dmsPage from "./routes/dms";
import { Toaster } from "./components/ui/toast";

const root = document.getElementById("root");
const storageManager = createLocalStorageManager("vite-ui-theme");

render(
  // JSX/TSX Nesting Hell 🔥🔥🔥
  () => (
    <>
      <SettingsProvider>
        <AuthProvider>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <ServerProvider>
              <ChannelProvider>
                <Router>
                  <Route path="/" component={baseLayout}>
                    <Route path="/home" component={HomePage} />
                    <Route path="dms" component={dmsPage} />
                    <Route path="/server" component={serverLayout}>
                      <Route path="/:id" component={serverPage} />
                    </Route>
                    <Route path="/settings" component={settingsPage} />
                    <Route path="*" component={NotFound} />
                  </Route>
                  <Route path="/login" component={LoginPage} />
                </Router>
              </ChannelProvider>
            </ServerProvider>
            <Toaster />
          </ColorModeProvider>
        </AuthProvider>
      </SettingsProvider>
    </>
  ),
  root!
);
