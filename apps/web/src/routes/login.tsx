import { createSignal, useContext, batch } from "solid-js";
import { AuthContext } from "../utils/contexts/auth";
import { RevoltClient } from "../utils/client";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "../components/ui/text-field";
import { Button } from "../components/ui/button";
import { showToast } from "~/components/ui/toast";
import { Flex } from "~/components/ui/flex";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useNavigate } from "@solidjs/router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = createSignal("");
  const [passwordValue, setPasswordValue] = createSignal("");
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    authContext.setLogging(true);
    RevoltClient.login({
      email: emailValue(),
      password: passwordValue(),
    })
      .then(() => {
        RevoltClient.connect();
        batch(() => {
          authContext.setLoggedIn(true);
          authContext.setLogging(false);
          setEmailValue("");
          setPasswordValue("");
        });

        showToast({
          title: "Login Successful",
          description: "You have been logged in.",
          variant: "success",
        });
        console.log("Session ID: ", RevoltClient?.sessionId);
        navigate("/home");
      })
      .catch((e) => {
        showToast({
          title: "Login Failed",
          description: e.message,
          variant: "error",
        });
        authContext.setLogging(false);
        console.log(e);
      });
  };

  return (
    <Flex flexDirection="row" class="w-screen h-screen gap-4">
      <div class="w-full h-full bg-muted">
        <h1 class="relative top-4 left-4 text-4xl font-bold">Feather</h1>
      </div>
      <Flex
        class="w-full h-full p-4"
        justifyContent="between"
        flexDirection="col"
      >
        <form
          class="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the browser from refreshing the page.
            handleLogin();
          }}
        >
          <TextField class="grid w-full max-w-sm items-center gap-1.5">
            <TextFieldLabel for="inputEmail">Email</TextFieldLabel>
            <TextFieldInput
              type="email"
              id="inputEmail"
              value={emailValue()}
              onChange={(e: any) => setEmailValue(e.currentTarget.value)}
              placeholder="Email"
            />
          </TextField>
          <TextField class="grid w-full max-w-sm items-center gap-1.5">
            <TextFieldLabel for="inputPassword">Password</TextFieldLabel>
            <TextFieldInput
              type="password"
              id="inputPassword"
              value={passwordValue()}
              onChange={(e: any) => setPasswordValue(e.currentTarget.value)}
              placeholder="Password"
            />
          </TextField>
          <Button
            disabled={authContext.isLogging()}
            class="w-max"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Card>
          <CardHeader>
            <CardTitle>Why login to your email and password?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You need to login to your email and password to use this app,
              since this client replies with <code>revolt.js</code>.
            </p>
            <p>
              Also if you don't want to login to your email and password, you
              can use your auth token {"(not recommended)"}
            </p>
          </CardContent>
        </Card>
      </Flex>
    </Flex>
  );
}
