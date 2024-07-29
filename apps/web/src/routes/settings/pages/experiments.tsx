import { TbAlertTriangle } from "solid-icons/tb";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function ExperimentsPage() {
  return (
    <>
      <Alert variant="destructive">
        <TbAlertTriangle />
        <AlertTitle>Careful when enabling!</AlertTitle>
        <AlertDescription>
          These experiments are either unstable or it doesn't work, so if you
          find bugs, please report it via Github.

          Currently we haven't made new experiments, but still had inside code.
        </AlertDescription>
      </Alert>
    </>
  );
}
