
# StylexNxdevIssues

- uses [nx@17](https://nx.dev/) for monorepo management
- uses [asdf](https://asdf-vm.com/#/core-manage-asdf-vm)
- uses [yarn@3](https://yarnpkg.com/) to manage workspaces and packages

## Setup

1. git clone
2. `$ ./setup.sh` to install nodejs
3. `$ yarn` to install dependencies
4. `$ yarn nx run useing-ds-package:serve` to run the app

## A note about monorepos

normally you'd expect to see in the `package.json` something like : 

```json
...
  "workspaces": [
    "apps/*",
    "pkgs/**/*",
  ]
...
```

However, as an "integrated" monorepo, NX.dev takes a different approach: 

- it uses tsconfig path aliases
- all deps are installed in the root `package.json`

