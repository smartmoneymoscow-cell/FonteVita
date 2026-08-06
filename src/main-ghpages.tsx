import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MockRouter } from "./__mocks__/tanstack-router";
import "./styles.css";
import { Route as IndexRoute } from "./routes/index";
import { Route as AccountRoute } from "./routes/account";
import { Route as BlogIndexRoute } from "./routes/blog/index";
import { Route as BlogSlugRoute } from "./routes/blog/$slug";
import { Route as BlogCategoryRoute } from "./routes/blog/category/$category";
(window as any).__fv_routes = [IndexRoute, AccountRoute, BlogIndexRoute, BlogSlugRoute, BlogCategoryRoute];
function App() { return <MockRouter />; }
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><BrowserRouter basename="/fontevita-vitality-hub"><App /></BrowserRouter></React.StrictMode>);
