import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "src/pages/AdminPage";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});
