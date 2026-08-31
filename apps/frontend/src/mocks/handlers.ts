import { http, HttpResponse } from "msw";
import { commandCenterFixture } from "@/mocks/fixtures/command-center";

export const handlers = [
    http.get(
        "*/incidents/:incidentId/command-center",
        ({ params }) => {
            const { incidentId } = params;

            return HttpResponse.json({
                ...commandCenterFixture,
                incident: {
                    ...commandCenterFixture.incident,
                    id: incidentId,
                },
            });
        },
    ),
];