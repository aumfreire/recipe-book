🧩 Node + Express + EJS Project Setup Guide

Welcome to the project!
This guide explains how to set up the workspace, install dependencies, and follow the Git workflow for collaboration.

🚀 Project Setup
1. Create a new workspace

In VS Code:

File → Add Folder to Workspace… → choose or create your project folder.

Or via terminal:

mkdir my-project
cd my-project

2. Initialize the project
npm init -y


This creates a package.json that lists your dependencies and project info.
You can remove -y to fill details manually.

3. Create core files & folders
index.js          # Main server file
views/            # EJS templates
.env              # Environment variables

4. Install dependencies
Command	Description
npm install express	Web framework for routing and handling HTTP requests.
npm install knex	SQL query builder for databases.
npm install ejs	Template engine for dynamic HTML.
npm install pg	PostgreSQL client for Node.js.
npm install express-session	Session management middleware.
npm install dotenv	Loads .env variables into process.env.

💡 npm v5+ saves dependencies automatically — no need for --save.

5. Optional: Auto-reloading with nodemon
npm install --save-dev nodemon


Add to your package.json:

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

6. Run your app
npm run dev


Then visit: http://localhost:3000

🧠 Summary

EJS → renders HTML with embedded JavaScript (<%= %>).

index.js → main server entry point.

.env → configuration (e.g. PORT=3000).

Knex + pg → connect to PostgreSQL.

express-session → handle login sessions.

🐙 GitHub Setup
1. Create the repository

On GitHub:

New → Repository → name it (e.g. recipe-book) → keep it empty (no README or .gitignore).

2. Initialize locally
git init
git add .
git commit -m "chore: initial project scaffold"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main

3. Protect the main branch

Settings → Branches → Add rule:

✅ Require pull request before merging

✅ Require 1+ review

⚙️ Optionally require status checks

4. Create a long-lived dev branch
git checkout -b dev
git push -u origin dev


All new work branches off dev.

5. Add collaborators

Repository → Settings → Collaborators → Add teammates.

6. Hygiene

Add .gitignore:

node_modules/
.env


Create .env.example:

PORT=3000
SESSION_SECRET=change-me
DATABASE_URL=postgres://user:pass@host:5432/db


Commit and push:

git add .env.example
git commit -m "chore: add env example"
git push

🧭 Daily Workflow
A) Sync your local dev
git checkout dev
git pull origin dev

B) Create a feature branch
git checkout -b feature/<short-desc>


Examples:

feature/login-page

fix/database-connection

chore/update-readme

C) Work and commit
git add .
git commit -m "feat(login): add login route and view"

D) Rebase with latest dev
git fetch origin
git rebase origin/dev
# if conflicts → fix → git add <files> → git rebase --continue

E) Push & open a PR
git push -u origin feature/login-page


On GitHub:

Base: dev

Compare: feature/login-page
Request a review → Address comments.

F) Merge

Once approved: Squash & Merge into dev, then delete the feature branch.

G) Promote to main

When ready for release:

Open PR from dev → main

Optionally tag a version (e.g., v0.1.0)

🧑‍🤝‍🧑 New Teammate Setup
git clone https://github.com/<you>/<repo>.git
cd <repo>
git checkout dev
npm install
cp .env.example .env
# Fill local values
npm run dev

⚡ Useful Git Commands
Purpose	Command
Show branches	git branch / git branch -r
Switch safely	git switch <branch>
Undo last commit	git reset --soft HEAD~1
Abort merge/rebase	git merge --abort / git rebase --abort
Commit Style
feat(auth): add session-based login
fix(routes): correct 404 order
chore: add nodemon and dev script
docs(readme): setup steps

✅ Final Tips

Keep PRs small and focused.

Always pull latest dev before starting work.

Never push directly to main.

Use .env.example to share configs safely.

Happy coding! 🚀
