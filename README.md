
# 💻 Project Setup & Workflow Guide

This guide contains the essential steps to get the project running and the necessary Git commands for daily collaboration.

---

## 🚀 Getting Started

Follow these steps **once** to set up your local environment and get the project running.

### 1. Clone the Repository

Clone the project from GitHub and navigate into the directory.

```bash
git clone [https://github.com/](https://github.com/)<you>/<repo-name>.git
cd <repo-name>
````

### 2. Install Dependencies

Install all necessary Node.js packages.

``` bash
npm install
```

| Command                           | Description                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm install express`             | **Express** — popular web framework that simplifies routing, requests, and responses.                                                                  |
| `npm install knex`                | **Knex.js** — SQL query builder to interact with databases in JavaScript.                                                                              |
| `npm install ejs`                 | **EJS (Embedded JavaScript Templates)** — templating engine for rendering dynamic HTML pages.                                                          |
| `npm install pg`                  | **pg** — PostgreSQL client that allows your Node app to connect to a Postgres database.                                                                |
| `npm install express-session`     | **express-session** — middleware for managing user sessions (e.g., login persistence).                                                                 |
| `npm install dotenv`              | **dotenv** — loads variables from your `.env` file into `process.env` for secure configuration.                                                        |
| `npm install pg`                  | **pg** - lets your Node.js app connect to and interact with a PostgreSQL database.                                                                     |
| `npm install multer@^1.4.5-lts.2` | **multer** -  is a middleware used with **Express** to handle **file uploads**—it processes incoming `multipart/form-data` forms (like image uploads). |
### 3. Configure Environment Variables

Create your local configuration file by copying the example, and then **fill in the required values** (especially for the database). **Do NOT commit `.env`!**

``` Bash
cp .env.example .env
```

### 4. Run the Project

Use the development script which includes file-watching for automatic restarts.

``` Bash
npm run dev
# The application should start, typically accessible at http://localhost:3000
```
or

``` Bash
node index.js
# Also accessible at http://localhost:3000
```
---

## 🔑 Daily Git Workflow

This is a cheat sheet for common daily tasks. We primarily work on **feature branches** based off of `dev`.

### 1. Start a New Task

Always fetch the latest changes and create a new, well-named branch.

``` Bash
git fetch origin
git checkout dev
git pull origin dev

# Create and switch to a new feature branch
git checkout -b feature/short-description 
```

### 2. Commit Your Work

Stage your changes and commit them with a descriptive message.

``` Bash
# Stage all modified/new files
git add .

# Commit changes (use 'feat', 'fix', 'chore', or 'docs' prefix)
git commit -m "feat(scope): short message describing the changes"
```

### 3. Update with Latest `dev` (Recommended)

To keep your history clean, regularly **rebase** your branch onto the latest `dev`.

``` bash
# While on your feature branch:
git fetch origin
git rebase origin/dev
```

> **Note:** If conflicts occur, resolve them, use `git add <files>`, and then run `git rebase --continue`.

### 4. Push and Create a Pull Request (PR)

Push your branch to the remote repository.

``` bash
# First time pushing this branch (sets upstream)
git push -u origin feature/short-description

# Subsequent pushes
git push
```

> After pushing, visit GitHub to create a Pull Request from your branch into `dev`.

---

## 🗑️ Cleanup Commands

### Delete Local and Remote Branches

Once your feature branch is merged into `dev`, you can delete it.

``` bash
# Delete local branch (will only work if merged)
git branch -d feature/short-description 

# Delete remote branch
git push origin --delete feature/short-description 
```

### Stash Changes

Temporarily save uncommitted changes when you need to switch branches quickly.

``` bash
git stash       # Save current uncommitted changes
git stash pop   # Restore the last saved stash
```

---

**Remember:**

- **NEVER** commit secrets or push directly to `main` or `dev`.
    
- Keep your PRs focused and small.
    

Happy coding! 🚀
