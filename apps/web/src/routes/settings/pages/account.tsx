import { Dialog, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { TbLogout, TbPencil } from "solid-icons/tb";
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
import {
  createResource,
  Match,
  onMount,
  Suspense,
  Switch,
  useContext,
} from "solid-js";
import { AuthContext } from "~/lib/contexts/auth";
import { createSignal } from "solid-js";
import SpinnerFallback from "~/components/fallback/spinnerFallback";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Markdown } from "~/components/markdown";

export default function AccountPage() {
  const [email, setEmail] = createSignal("");
  const [profile] = createResource(async () => {
    const resProfile = RevoltClient.user?.fetchProfile();
    return await resProfile;
  });

  const { isLoggedIn } = useContext(AuthContext);
  onMount(async () => {
    if (isLoggedIn()) {
      const resEmail = RevoltClient.account.fetchEmail();
      setEmail(await resEmail);
    }
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            class="gap-2"
          >
            <Label>Email: {email() || "Loading..."}</Label>
            <Dialog>
              <DialogTrigger as={Button<"button">} variant={"ghost"}>
                Change Email
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Email</DialogTitle>
                </DialogHeader>
                <div class="py-4">
                  <p>
                    You are going to change your email, it will{" "}
                    <b>remove all your session</b> when you finish.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </Flex>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            class="gap-2 py-4"
          >
            <Suspense
              fallback={
                <>
                  <SpinnerFallback size={100} strokeSize={10} />
                </>
              }
            >
              <Flex flexDirection="col" justifyContent="start" class="gap-2">
                <div class="z-0 relative w-full h-full">
                  <AspectRatio ratio={16 / 4}>
                    <Switch>
                      <Match when={profile()?.bannerURL}>
                        <img
                          alt={RevoltClient.user?.displayName}
                          class="bg-muted h-full w-full bg-contain bg-center rounded-lg"
                          src={profile()?.bannerURL}
                        />
                      </Match>
                      <Match when={!profile()?.bannerURL}>
                        <div class="bg-muted h-full w-full bg-contain bg-center rounded-lg"></div>
                      </Match>
                    </Switch>
                  </AspectRatio>
                  <Button class="absolute bottom-2 right-2" variant="default">
                    Change Banner
                  </Button>
                </div>

                <Flex
                  flexDirection="col"
                  justifyContent="start"
                  alignItems="start"
                  class="p-4 gap-2"
                >
                  <Flex
                    justifyContent="start"
                    alignItems="center"
                    class="gap-2"
                  >
                    <h1 class="text-2xl font-semibold leading-none tracking-tight">
                      {RevoltClient.user?.displayName}
                    </h1>
                    <Dialog>
                      <DialogTrigger
                        as={Button<"button">}
                        size="icon"
                        variant={"ghost"}
                      >
                        <TbPencil />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Display Name</DialogTitle>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </Flex>
                  <h2 class="text-lg">
                    @{RevoltClient.user?.username}#
                    {RevoltClient.user?.discriminator}
                  </h2>
                </Flex>
              </Flex>
            </Suspense>
          </Flex>
          <Flex
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
            class="gap-2"
          >
            <h1 class="text-2xl font-semibold leading-none tracking-tight">
              Bio
            </h1>
            <div class="w-full h-min rounded-lg border-2 border-muted p-4">
              <Markdown content={profile()?.content} />
            </div>
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
