import { Dialog } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { TbLogout } from "solid-icons/tb";
import { AlertTitle } from "~/components/ui/alert";
import { DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "~/components/ui/dialog";
import { RevoltClient } from "~/lib/client";

export default function AccountPage() {
  return (
    <>
      <h1 class="font-bold text-2xl">Work in Progress</h1>
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