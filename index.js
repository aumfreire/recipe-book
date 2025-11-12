require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// -----------------------------------------------------------------------------
// Views & static
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(expressLayouts);
// Templates are currently full HTML files (copied from the static template).
// Use the main layout for converted pages. Pages should be body-only partials
// so they don't contain duplicate head/header/footer markup.
app.set("layout", "layouts/main");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------------------------------------
// Sessions
// -----------------------------------------------------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// -----------------------------------------------------------------------------
// (Optional) Database (Knex + PostgreSQL)
// -----------------------------------------------------------------------------
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "foodisus",
    port: process.env.DB_PORT || 5432,
  },
});

// -----------------------------------------------------------------------------
// Auth gate for protected routes (allow public assets)
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  // Public routes and assets (no auth required)
  if (
    req.path === "/" ||
    req.path === "/about" ||
    req.path === "/blog-post" ||
    req.path === "/receipe-post" ||
    req.path === "/contact" ||
    req.path === "/elements" ||
    req.path === "/login" ||
    req.path === "/logout" ||
    req.path.startsWith("/css/") ||
    req.path.startsWith("/js/") ||
    req.path.startsWith("/img/") ||
    req.path.startsWith("/fonts/") ||
    req.path === "/favicon.ico"
  ) {
    return next();
  }

  // Allow direct static asset files that live at the root (like /style.css)
  const staticExts = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".map",
  ];
  if (staticExts.some((ext) => req.path.endsWith(ext))) return next();

  if (req.session.isLoggedIn) return next();

  return res.render("pages/login", {
    title: "Login",
    error_message: "Please log in to access this page",
  });
});

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("index", { title: "Home", active: "home" });
});

app.get("/about", (req, res) => {
  // Render the converted about page using the main layout
  res.render("about", {
    title: "About",
    active: "about",
    layout: "layouts/main",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", active: "contact" });
});

app.get("/elements", (req, res) => {
  res.render("elements", { title: "Elements" });
});

app.get("/receipe-post", (req, res) => {
  res.render("receipe-post", { title: "Receipe" });
});

app.get("/blog-post", (req, res) => {
  res.render("blog-post", { title: "Blog Post" });
});

app.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login", error_message: null });
});

app.post("/login", (req, res) => {
  const sName = req.body.username;
  const sPassword = req.body.password;

  if (!sName || !sPassword) {
    return res.render("pages/login", {
      title: "Login",
      error_message: "Please enter username and password",
    });
  }

  knex("users")
    .select("username", "password")
    .where({ username: sName, password: sPassword })
    .then((rows) => {
      if (rows.length) {
        req.session.isLoggedIn = true;
        req.session.username = sName;
        return res.redirect("/");
      }
      return res.render("pages/login", {
        title: "Login",
        error_message: "Invalid login",
      });
    })
    .catch((err) => {
      console.error("Login error:", err);
      return res.render("pages/login", {
        title: "Login",
        error_message: "Invalid login",
      });
    });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// Catch-all
app.get(/.*/, (req, res) => {
  res.render("index", { title: "Home" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
