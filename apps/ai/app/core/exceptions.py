"""Application-level erros for providers configuration and execution."""

from typing import Literal

ProviderErrorKind = Literal[
    "authentication",
    "rate_limit",
    "timeout",
    "network",
    "unavailable",
    "request",
    "response",
    "internal",
]


class ProviderConfigurationError(ValueError):
    """The provider cannot be initialized with the supplied settings."""


class ProviderError(RuntimeError):
    """A model provider operation failed."""

    def __init__(self, kind: ProviderErrorKind, message: str) -> None:
        super().__init__(message)
        self.kind = kind
