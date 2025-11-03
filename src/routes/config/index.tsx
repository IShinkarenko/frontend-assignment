import { createFileRoute } from "@tanstack/react-router";
import ConfigPage from "src/pages/ConfigPage";
import { beforeLoad } from "./-guard";

export const Route = createFileRoute("/config/")({
  beforeLoad,
  component: ConfigPage,
});
