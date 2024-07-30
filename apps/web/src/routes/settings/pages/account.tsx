import { Dialog } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { TbLogout } from "solid-icons/tb";
import { AlertTitle } from "~/components/ui/alert";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "~/components/ui/dialog";
import { RevoltClient } from "~/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Flex } from "~/components/ui/flex";
import { onMount, useContext } from "solid-js";
import { AuthContext } from "~/lib/contexts/auth";
import { createSignal } from "solid-js";

export default function AccountPage() {
  const [email, setEmail] = createSignal("");

  const { isLoggedIn } = useContext(AuthContext);
  onMount(async () => {
    if (isLoggedIn()) {
      const res = RevoltClient.account.fetchEmail();
      setEmail(await res);
    }
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            class="gap-2"
          >
            <Label>Email</Label>
            <p>{email() || "Loading..."}</p>
          </Flex>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger
          as={Button<"button">}
          variant={"destructive"}
          class="w-max flex flex-row items-center gap-2"
        >
          <TbLogout /> Log Out
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <AlertTitle>Are you sure?</AlertTitle>
          </DialogHeader>
          <div class="py-4">
            <p>
              It will log out your account and delete the session if you press
              Logout.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                // Self-destruct the session.
                RevoltClient.sessions.delete(`${RevoltClient.sessionId}`);
                RevoltClient.emit("logout");
              }}
              class="w-max flex flex-row items-center gap-2"
              variant={"destructive"}
            >
              <TbLogout /> Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
