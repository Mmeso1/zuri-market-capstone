#!/usr/bin/env bash
# Appends ONE line per run to the report file: timestamp | overall | frontend | backend
set -u

BASE_URL="${ZURI_URL:-http://localhost}"
REPORT="${ZURI_REPORT:-/var/log/zuri/health-report.txt}"
mkdir -p "$(dirname "$REPORT")"

check() { # $1 = label, $2 = URL
  local code
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$2" || true)"
  if [ "$code" = "200" ]; then echo "$1=OK($code)"; else echo "$1=FAIL(${code:-000})"; fi
}

front="$(check frontend "$BASE_URL/")"
back="$(check backend "$BASE_URL/api/health")"

if [[ "$front" == *OK* && "$back" == *OK* ]]; then status="HEALTHY"; else status="UNHEALTHY"; fi

# >> appends a new line. A single > would erase the earlier days.
echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') | $status | $front | $back" >> "$REPORT"

[ "$status" = "HEALTHY" ] # non-zero exit when unhealthy, so failures are visible to cron
