"""Shared test options controlling live external requests."""

import pytest


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption(
        "--run-external",
        action="store_true",
        default=False,
        help="Allow tests that make real external API requests.",
    )


def pytest_collection_modifyitems(
    config: pytest.Config,
    items: list[pytest.Item],
) -> None:
    if config.getoption("--run-external"):
        return

    skip_external = pytest.mark.skip(
        reason="Live API test: pass --run-external to enable."
    )
    for item in items:
        if item.get_closest_marker("external") is not None:
            item.add_marker(skip_external)
