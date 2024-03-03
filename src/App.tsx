import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div>
      <Button variant={"primary"}>Name</Button>
      <Button as={"a"} variant={"primary"}>
        Name
      </Button>
    </div>
  );
}
