"""Validation primitives shared by internal AI boundary models."""

import calendar
import re
from typing import Annotated

from pydantic import AfterValidator, BaseModel, BeforeValidator, ConfigDict, Field
from pydantic.alias_generators import to_camel

MAX_SAFE_INTER = 9_007_199_254_740_991

UUID_PATTERN = re.compile(
    r"(?:"
    r"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-"
    r"[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}"
    r"|00000000-0000-0000-0000-000000000000"
    r"|ffffffff-ffff-ffff-ffff-ffffffffffff"
    r")"
)

DATETIME_PATTERN = re.compile(
    r"([0-9]{4})-([0-9]{2})-([0-9]{2})"
    r"T(?:[01][0-9]|2[0-3]):[0-5][0-9]"
    r"(?::[0-5][0-9](?:\.[0-9]+)?)?Z"
)

JS_WHITESPACE = (
    "\u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680"
    "\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007"
    "\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff"
)


def validate_id(value: str) -> str:
    if UUID_PATTERN.fullmatch(value) is None:
        raise ValueError("Expected a UUID accepted by the shared IdSchema")
    return value


def validate_datetime(value: str) -> str:
    match = DATETIME_PATTERN.fullmatch(value)

    if match is None:
        raise ValueError("Expected an ISO UTC datetime ending in Z")

    year, month, day = map(int, match.groups())

    if not 1 <= month <= 12:
        raise ValueError("Invalid month")
    if not 1 <= day <= calendar.monthrange(year, month)[1]:
        raise ValueError("Invalid day")

    return value


def validate_number(value: object) -> object:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError("Expected a JSON number")
    return value


def normalize_interger(value: object) -> int:
    validate_number(value)

    if isinstance(value, float):
        if not value.is_integer():
            raise ValueError("Expected an integer")
        return int(value)
    return value


def trim_reference(value: str) -> str:
    return value.strip(JS_WHITESPACE)


def validate_hypothesis_reference(value: str) -> str:
    if re.fullmatch(r"H[0-9]+", value) is None:
        raise ValueError("Expected a reference such as H1")
    return value


def validate_evidence_reference(value: str) -> str:
    if re.fullmatch(r"EV-[0-9]+", value) is None:
        raise ValueError("Expected a reference such as EV-1")
    return value


Id = Annotated[str, AfterValidator(validate_id)]
DateTime = Annotated[str, AfterValidator(validate_datetime)]
Score = Annotated[
    float,
    Field(ge=0, le=100, allow_inf_nan=False),
    BeforeValidator(validate_number),
]
Count = Annotated[
    int,
    Field(ge=0, le=MAX_SAFE_INTER),
    BeforeValidator(normalize_interger),
]
Rank = Annotated[
    int,
    Field(ge=1, le=MAX_SAFE_INTER),
    BeforeValidator(normalize_interger),
]
DegradationLevel = Annotated[
    int,
    Field(ge=0, le=5),
    BeforeValidator(normalize_interger),
]
HypothesisReference = Annotated[
    str, AfterValidator(trim_reference), AfterValidator(validate_hypothesis_reference)
]
EvidenceReference = Annotated[
    str,
    AfterValidator(trim_reference),
    AfterValidator(validate_evidence_reference),
]


class BoundaryModel(BaseModel):
    """Use python attributes internally and canonical JSON names externally."""

    model_config = ConfigDict(
        alias_generator=to_camel,
        validate_by_alias=True,
        validate_by_name=False,
        serialize_by_alias=True,
        strict=True,
        extra="ignore",
    )
