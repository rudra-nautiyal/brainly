import { useEffect } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://platform.x.com/widgets.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-end gap-4 mt-2">
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
      </div>

      <div className="flex">
        <Card
          type="twitter"
          link="https://x.com/ESPNIndia/status/2075510876896207124"
          title="First tweet"
        />

        <Card
          type="youtube"
          link="https://www.youtube.com/watch?v=GRk01RER534"
          title="First video"
        />
      </div>
    </div>
  );
}

export default App;
