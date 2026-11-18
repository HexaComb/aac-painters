#!/usr/bin/env bash
set -Eeuo pipefail

BASE_SHA="${1:?Usage: run-mobile-perf-comparison.sh BASE_SHA HEAD_SHA}"
HEAD_SHA="${2:?Usage: run-mobile-perf-comparison.sh BASE_SHA HEAD_SHA}"
RESULTS_DIR="${RESULTS_DIR:-/tmp/aac-perf}"
PORT=8787
URL="http://127.0.0.1:${PORT}/"
mkdir -p "$RESULTS_DIR"

server_pid=""
cleanup() {
  if [[ -n "$server_pid" ]]; then
    kill "$server_pid" >/dev/null 2>&1 || true
    wait "$server_pid" 2>/dev/null || true
    server_pid=""
  fi
}
trap cleanup EXIT

benchmark_ref() {
  local label="$1"
  local ref="$2"
  echo "::group::${label} — ${ref}"
  git checkout --detach "$ref"
  npm run build

  npx wrangler dev --local --ip 127.0.0.1 --port "$PORT" > "$RESULTS_DIR/${label}-server.log" 2>&1 &
  server_pid="$!"

  local ready=0
  for _ in $(seq 1 90); do
    if curl --silent --show-error --fail --output /dev/null "$URL" 2>/dev/null; then
      ready=1
      break
    fi
    if ! kill -0 "$server_pid" 2>/dev/null; then break; fi
    sleep 1
  done
  if [[ "$ready" -ne 1 ]]; then
    echo "::error::Worker failed to serve the homepage"
    cat "$RESULTS_DIR/${label}-server.log"
    exit 1
  fi

  for run in 1 2 3; do
    echo "${label}: Lighthouse mobile run ${run}/3"
    npx --yes lighthouse@13.0.1 "$URL" \
      --only-categories=performance \
      --form-factor=mobile \
      --throttling-method=simulate \
      --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" \
      --output=json \
      --output-path="$RESULTS_DIR/${label}-${run}.json" \
      --quiet
  done
  cleanup
  echo "::endgroup::"
}

benchmark_ref before "$BASE_SHA"
benchmark_ref after "$HEAD_SHA"
node scripts/summarize-mobile-perf.mjs "$RESULTS_DIR"
