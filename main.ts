// Say What Actually Broke — make.fun entry
// One line of software error copy: the brutal truth, funny on a single read.
// Writes the entry deterministically to /output/entry.txt and self-checks
// the gate (exactly one line, 1-200 characters, not only whitespace),
// then reads the file back and verifies it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "The server is up, the database is up, and the cable between them is not.";

function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} chars, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  gate(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from ENTRY");
  }
  console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
  console.log(ENTRY);
}

main();
