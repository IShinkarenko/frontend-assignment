import { Provider } from "react-redux";
import { store, persistor } from "src/app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "src/routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div className="p-4 text-slate-600">Loading…</div>}
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
