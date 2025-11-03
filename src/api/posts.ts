export type Post = { id: number; title: string; body: string };

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}
