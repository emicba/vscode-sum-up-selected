#!/usr/bin/env bash

if [ -z "$VSCE_TOKEN" ]; then
  >&2 echo "VSCE_TOKEN is not set, you might want to run 'export \$(grep -v '^#' .env | xargs)'"
  exit 1
fi

set -ex

npx @vscode/vsce package --allow-star-activation
npx @vscode/vsce publish --allow-star-activation --pat "$VSCE_TOKEN"
