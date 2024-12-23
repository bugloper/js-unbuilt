import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import unbuilt from "../../index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const currentDir = path.dirname(fileURLToPath(import.meta.url));

const { 
  config, 
  stylesheetLinkTag, 
  javascriptIncludeTag, 
  imageUrl 
} = unbuilt;

// Configure unbuilt with correct paths
config.configure((cfg) => {
  cfg.app_path = path.join(currentDir, 'app');
  cfg.asset_path = path.join(currentDir, 'app', 'assets');
  cfg.public_path = path.join(currentDir, 'public');
});

// Static file serving from public directory
app.use(express.static(path.join(currentDir, 'public')));

// Set up EJS and layouts
app.set("view engine", "ejs");
app.set("views", path.join(currentDir, 'app', 'views'));
app.use(expressEjsLayouts);
app.set("layout", "layouts/application");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Make asset helpers available to all views
app.use((req, res, next) => {
  res.locals.stylesheetLinkTag = stylesheetLinkTag;
  res.locals.javascriptIncludeTag = javascriptIncludeTag;
  res.locals.imageUrl = imageUrl;
  next();
});

// Routes
app.get("/", (_req, res) => {
  res.render("pages/index", { 
    pageTitle: "Welcome to My App"
  });
});

// Start server
app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
