// Ensure process.versions.node is a valid semver string.
// Executed in both the browser sandbox and Node during build.
if (typeof process !== "undefined") {
  // If the object or value is missing / empty, fill it.
  if (!process.versions || !process.versions.node) {
    ;(process as any).versions = { ...(process.versions ?? {}), node: "20.11.0" }
  }
}
