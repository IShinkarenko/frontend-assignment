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
          <div className="relative w-full overflow-hidden rounded-md border bg-white">
            <div className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="h-5 w-32 rounded bg-slate-200" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-4 w-11/12 rounded bg-slate-200" />
                  <div className="h-4 w-10/12 rounded bg-slate-200" />
                  <div className="h-4 w-9/12 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="p-4 text-red-600">{(error as Error).message}</div>
        ) : (
          <Table data={data ?? []} columns={columns} />
        )}
      </Card>
    </section>
  );
}
