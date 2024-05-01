import { Button } from "@/components/ui/Button";
import { Plus } from "@phosphor-icons/react";
import { NewRequestDialog } from "../library/actions";

export default function NavAction() {
  return (
    <NewRequestDialog
      trigger={
        <Button context="navbar">
          <Plus className="size-2xl" weight="bold" />
        </Button>
      }
    />
  );
}
