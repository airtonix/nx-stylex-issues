#!/usr/bin/env bash

# Local vars
ASDF_VERSION=${ASDF_VERSION:-v0.8.1}
ASDF_HOME=$HOME/.asdf
ASDF_BIN=$ASDF_HOME/asdf.sh

set -e

[ $(command -v git) ] || {
  echo "📛📦 Missing git"
  exit 1
}
[ $(command -v curl) ] || {
  echo "📛📦 Missing curl"
  exit 1
}
#
# Helper to idempotently add strings to target files
#
append_uniquely() {
  if ! grep -q "$2" "$1"; then
    echo "====> ✍ Writing \"$2\" into \"$1\" "
    echo "${2}" >>$1
  fi
}

case "${SHELL}" in
/bin/bash)
  SHELL_PROFILE=~/.bashrc
  SHELL_NAME="bash"
  ;;
/bin/zsh)
  SHELL_PROFILE=~/.zshrc
  SHELL_NAME="zsh"
  ;;
esac

echo "=> 💁 [ASDF] install with plugins"

if [ ! -f "$ASDF_BIN" ]; then
  echo "===> ⤵️ ASDF not detected ... installing"
  git clone https://github.com/asdf-vm/asdf.git "$ASDF_HOME" --branch $ASDF_VERSION
  [ ! command -v asdf ] &>/dev/null && {
    echo "====> ⚕️ adding to shell profile"
    append_uniquely "$SHELL_PROFILE" ". $ASDF_HOME/asdf.sh"
    append_uniquely "$SHELL_PROFILE" ". $ASDF_HOME/completions/asdf.bash"
  }
fi

source "$ASDF_BIN"

asdf plugin add asdf-plugin-manager https://github.com/asdf-community/asdf-plugin-manager.git
asdf plugin update asdf-plugin-manager v1.1.1
asdf install asdf-plugin-manager 1.1.1
asdf global asdf-plugin-manager 1.1.1


echo "==> 💁 [ASDF] install tools"
asdf-plugin-manager add-all
asdf install

echo "==> 💁 [ASDF] reshim globals"
asdf reshim

echo "==> 💁 [ASDF] Done ✅"
