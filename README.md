# saas-web-v1



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/rlance2x/saas-web-v1.git
git branch -M main
git push -uf origin main
```

## Yet another Next.js project template

This template includes a set of our favorite dev tools scaffolded into a Next.js project. Tools include:

- TypeScript
- Tailwind CSS
- ESLint, with Prettier plugin
- Prettier, include Tailwind Plugin
- Husky pre-commit hooks for formatting
- Jest
- Docker

The easiest way to get started with this template is with [degit](https://github.com/Rich-Harris/degit) to avoid
including the template commit log:

```bash
npm install -g degit # or yarn add --global degit
```

Once installed:

```bash
degit JoeyMckenzie/nextjs-typescript-tailwind-template your-project-name
cd your-project-name && npm install
```

If you'd prefer to simply `git clone` instead:

```bash
git clone https://github.com/JoeyMckenzie/nextjs-typescript-tailwind-template.git your-project-name
cd your-project-name && git remote remove origin
```

To start with Docker, verify you have it installed, then:

```bash
docker-compose up --build
```

#### Note on Docker usage:

The Docker image is the officially recommended build configuration preconfigured with npm. If you prefer to use yarn,
do the following within `Dockerfile`:

```Dockerfile
# If using yarn with a `yarn.lock` comment out below
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./
RUN npm ci
```