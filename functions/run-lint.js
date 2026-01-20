const {spawn} = require("child_process");

// Force Legacy Config mode for ESLint v8
process.env.ESLINT_USE_FLAT_CONFIG = "false";

const args = process.argv.slice(2);

// If user didn't supply specific files/flags, use default
// However, note that "node run-lint.js --fix" -> args=["--fix"]. We still need "." usually.
// ESLint needs a target.

// We will construct the args: [".", ...args]
const runArgs = [".", ...args];

try {
  // Use 'npx' or direct 'eslint' assuming it's in the path (npm run puts .bin in path).
  // Windows requires .cmd extension if calling directly, but spawn with shell: true works if PATH is set.
  // Safest cross-platform way within npm scripts context:
  // Just run "eslint" command. npm adds node_modules/.bin to PATH.

  const child = spawn("eslint", runArgs, {
    stdio: "inherit",
    env: process.env,
    shell: true, // Required to resolve 'eslint' from PATH on Windows
  });

  child.on("exit", (code) => {
    process.exit(code);
  });

  child.on("error", (err) => {
    console.error("Failed to start eslint process:", err);
    process.exit(1);
  });
} catch (e) {
  console.error("Failed to locate or run eslint:", e);
  process.exit(1);
}
