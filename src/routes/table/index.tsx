import { createFileRoute } from "@tanstack/react-router";
import TablePage from "src/pages/TablePage";

export const Route = createFileRoute("/table/")({
  component: TablePage,
});
