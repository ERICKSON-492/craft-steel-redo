import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router.tsx";

const router = getRouter();
import "./styles.css"; // Your styles file (adjust name if it's index.css)

// Find the HTML element
const rootElement = document.getElementById("root")!;

// Render the TanStack Router provider instead of <App />
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
