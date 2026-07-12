import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <div>hello, world</div>
      <Button
        startIcon={<PlusIcon size="lg" />}
        variant="primary"
        size="md"
        text="Content"
        onClick={() => {}}
      />

      <Button
        startIcon={<ShareIcon size="lg" />}
        variant="secondary"
        size="md"
        text="Share"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
