import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <>
      <div>hello, world</div>
      <Button
        startIcon={<PlusIcon />}
        variant="primary"
        size="md"
        text="Content"
        onClick={() => {}}
      />

      <Button variant="secondary" size="md" text="Share" onClick={() => {}} />
    </>
  );
}

export default App;
