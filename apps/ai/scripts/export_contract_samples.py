"""Export Python-serialized samples for independent Zod verification."""

import argparse
import json
from pathlib import Path

from app.api.investigations import build_scaffold_result
from app.contracts.investigation import (
    AIInvestigationResult,
    StartAIInvestigationRequest,
)

REPO_ROOT = Path(__file__).resolve().parents[3]
FIXTURE = REPO_ROOT / "packages/contracts/fixtures/internal-ai/boundary.json"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    fixture = json.loads(FIXTURE.read_text(encoding="utf-8"))
    request = StartAIInvestigationRequest.model_validate(fixture["request"])
    result = AIInvestigationResult.model_validate(fixture["result"])

    output = {
        "request": request.model_dump(mode="json", by_alias=True),
        "result": result.model_dump(mode="json", by_alias=True),
        "scaffold": build_scaffold_result(request).model_dump(
            mode="json", by_alias=True
        ),
    }
    args.output.write_text(json.dumps(output, indent=2), encoding="utf-8")
    print(f"Exported Python contract samples to {args.output}")


if __name__ == "__main__":
    main()
