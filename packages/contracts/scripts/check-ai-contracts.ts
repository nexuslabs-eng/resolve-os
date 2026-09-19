import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { StartAIInvestigationRequestSchema } from "../src/internal-ai/investigation-request.schema.js";
import { AIInvestigationResultSchema } from "../src/internal-ai/investigation-result.schema.js";

const readFixture = (name: string) =>
  JSON.parse(
    readFileSync(
      new URL(`../fixtures/internal-ai/${name}`, import.meta.url),
      "utf8",
    ),
  );

const boundary = readFixture("boundary.json");
const invalid = readFixture("invalid.json");

const schemas = {
  request: StartAIInvestigationRequestSchema,
  result: AIInvestigationResultSchema,
};

assert.deepStrictEqual(
    schemas.request.parse(boundary.request),
    boundary.request,
);
assert.deepStrictEqual(
    schemas.result.parse(boundary.result),
    boundary.result,
);

for (const caseData of invalid) {
    const name = caseData.model as keyof typeof schemas;
    const value = structuredClone(boundary[name]);
    let parent = value;

    for (const segment of caseData.path.slice(0, -1)) {
        parent = parent[segment];
    }

    const key = caseData.path.at(-1);
    if (caseData.remove) {
        delete parent[key];
    } else {
        parent[key] = caseData.value;
    }

    assert.equal(
        schemas[name].safeParse(value).success,
        false,
        `Expected rejection: ${name}.${caseData.path.join(".")}`,
    );
}

const outputPath = process.argv[2];
assert.ok(outputPath, "Provide the Python-generated JSON file path.");

const output = JSON.parse(readFileSync(outputPath, "utf8"));

assert.deepStrictEqual(
    schemas.request.parse(output.request),
    boundary.request,
);
assert.deepStrictEqual(
    schemas.result.parse(output.result),
    boundary.result,
);
assert.deepStrictEqual(
    schemas.result.parse(output.scaffold),
    output.scaffold,
);
assert.equal(output.scaffold.status, "FAILED");
assert.equal(
    output.scaffold.investigationId,
    boundary.request.investigationId,
);

console.log(
    `AI contracts passed: shared fixtures, ${invalid.length} invalid cases, and Python output.`,
);