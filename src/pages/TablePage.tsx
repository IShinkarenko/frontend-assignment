import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/app/hooks";
import { Card, Table, PageHeader } from "src/components";
import type { ColumnDef } from "@tanstack/react-table";
import { getPosts, type Post } from "src/api/posts";

export default function TablePage() {
  const rowsCount = useAppSelector((s) => s.config.rowsCount);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    select: (posts: Post[]) => posts.slice(0, rowsCount),
  });

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        title="Data Table"
        description={`Showing ${rowsCount} row${rowsCount === 1 ? "" : "s"} based on configuration.`}
      />

      <Card title="Posts" className="space-y-2">
        {isLoading ? (
          <div className="p-4 text-slate-600">Loading…</div>
        ) : isError ? (
          <div className="p-4 text-red-600">{(error as Error).message}</div>
        ) : (
          <Table data={data ?? []} columns={columns} />
        )}
      </Card>
    </section>
  );
}
