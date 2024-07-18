import { TbBrandSolidjs, TbCodeDots } from "solid-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Col, Grid } from "~/components/ui/grid";

export default function HomePage() {
  return (
    <Flex
      class="gap-4"
      flexDirection="col"
      justifyContent="center"
      alignItems="center"
    >
      <h1 class="text-3xl font-bold">Client Placeholder</h1>
      <Card>
        <CardHeader>
          <CardTitle>What the client does?</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid cols={2} class="gap-2">
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Flex justifyContent="start" class="gap-3">
                      <TbBrandSolidjs /> Powered by Solid + Vite
                    </Flex>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This client was created using Solid and Vite</p>
                </CardContent>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Flex justifyContent="start" class="gap-3">
                      <TbCodeDots /> Powered by revolt.js
                    </Flex>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We use revolt.js as it was intended.</p>
                </CardContent>
              </Card>
            </Col>
          </Grid>
        </CardContent>
      </Card>
    </Flex>
  );
}
