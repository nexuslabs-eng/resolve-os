"""Provider-independent interface for text generation."""

from typing import Protocol


class AIProvider(Protocol):
    async def generate(self, prompt: str) -> str:
        """Generate a nonempty text response."""
        ...
