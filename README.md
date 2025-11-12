# Node + Express + EJS Project Setup Guide

Welcome — paste this as your README.md.

---

## 🚀 Project Setup

### 1. Create a new workspace
In VS Code:
- File → Add Folder to Workspace… → choose or create your project folder

Or via terminal:
```bash
mkdir my-project
cd my-project
```

### 2. Initialize the project
```bash
npm init -y
```

### 3. Create core files & folders
```bash
touch index.js
mkdir views
touch .env
```

### 4. Install dependencies
```bash
npm install express knex ejs pg express-session dotenv multer@^1.4.5-lts.2
```
Optional dev tool:
```bash
npm install --save-dev nodemon
```

Add scripts to package.json:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 5. Run the app
```bash
npm run dev
# then open http://localhost:3000
```

---

## 🔑 Environment variables
Create `.env` (do NOT commit `.env`):
```
PORT=3000
SESSION_SECRET=change-me
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=admin
DB_NAME=foodisus
DB_PORT=5432
```

Create `.env.example`:
```
PORT=3000
SESSION_SECRET=change-me
DATABASE_URL=postgres://user:pass@host:5432/db
```

Add `.env` to `.gitignore`:
```
node_modules/
.env
```

---

## 🧾 Key packages & purpose
- **express** — web framework and routing  
- **ejs** — view templates  
- **knex** — SQL query builder  
- **pg** — PostgreSQL client  
- **express-session** — session management  
- **dotenv** — load .env into process.env  
- **multer** — handle file uploads  
- **nodemon** — optional auto-reload in dev

---

# 🐙 GitHub setup & workflow
---

## 👥 New teammate setup
```bash
git clone https://github.com/<you>/<repo>.git
cd <repo>
git checkout dev
npm install
cp .env.example .env
# fill .env values
npm run dev
```

---

## ⚡ Daily Git cheat sheet (common commands)
- Check repo state:
```bash
git status
git remote -v
```
- Work on a branch:
```bash
git fetch origin
git checkout -b feature/short-desc    # or: git switch -c feature/short-desc
```
- Stage & commit:
```bash
git add .                              # stage all changes
git add path/to/file.js                # stage specific file
git commit -m "feat(scope): short msg" # commit staged changes
```
- Amend last commit (before push):
```bash
git commit --amend --no-edit           # change the commit content without editing message
git commit --amend -m "new message"    # amend message too
```
- Update local branch with remote `dev` (recommended workflow):
```bash
git checkout dev
git pull --rebase origin dev           # keep a linear history
# or on feature branch:
git fetch origin
git rebase origin/dev
# resolve conflicts, then:
git add <files>
git rebase --continue
```
- Push changes:
```bash
git push -u origin feature/short-desc  # first push sets upstream
git push                               # subsequent pushes
```
- Merging & PRs:
```bash
# locally test merge (not required if using PR on GitHub)
git checkout dev
git merge feature/short-desc
```
- Delete branches:
```bash
git branch -d feature/short-desc       # delete local branch (will refuse if not merged)
git push origin --delete feature/short-desc  # delete remote branch
```
- Stash work:
```bash
git stash          # save uncommitted changes
git stash pop      # restore stash
```
- Inspect history:
```bash
git log --oneline --graph --decorate --all
```

---

## ⚙️ Other useful commands
- Show remote branches:
```bash
git branch -r
```
- Recover from mistakes:
```bash
git reset --soft HEAD~1    # undo last commit but keep changes staged
git reset --hard <commit>  # WARNING: discards local changes
git merge --abort
git rebase --abort
```

---

## 🧰 Commit message style examples
- feat(auth): add session-based login  
- fix(routes): correct 404 order  
- chore: add nodemon and dev script  
- docs(readme): setup steps

---

## ✅ Final tips
- Keep PRs small and focused.  
- Always pull latest `dev` before starting work.  
- **NEVER** push directly to `main`.  
- Use `.env.example` to share config safely.

Happy coding! 🚀
