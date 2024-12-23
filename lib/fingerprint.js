import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/**
 * Generates a fingerprint for the specified file path.
 *
 * @param {string} path - The file path to fingerprint.
 * @param {string} [algo="sha256"] - The hashing algorithm to use (default is "sha256").
 * @returns {string}
 */
export function fingerprint(path, algo = "sha256") {
  const filebuffer = readFileSync(path);
  const hash = createHash(algo);

  hash.update(filebuffer);
  const hashedData = hash.digest("hex");

  return hashedData;
}

