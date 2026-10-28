const { test, before, after } = require("node:test");
const assert = require("node:assert");
const { spawn } = require("node:child_process");

let server;
before(async () => {
  server = spawn("node", ["server.js"], {
    env: { ...process.env, PORT: "5055" },
  });
  await new Promise((resolve) => setTimeout(resolve, 1500));
});
after(() => server.kill());

test("health endpoint returns 200", async () => {
  const res = await fetch("http://localhost:5055/api/health");
  assert.strictEqual(res.status, 200);
});
