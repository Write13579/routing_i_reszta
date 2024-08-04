import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Pokemon
        </Link>{" "}
        <Link to="/jokes" className="[&.active]:font-bold">
          Jokes
        </Link>{" "}
        <Link to="/new" className="[&.active]:font-bold">
          new
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
