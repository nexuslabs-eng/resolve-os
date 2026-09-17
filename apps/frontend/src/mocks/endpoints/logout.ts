import { AnonymousAuthSessionSchema } from "contracts";
import { http, HttpResponse } from "msw";
import { setAuthSession } from "@/mocks/utils";
import { apiEndpoint } from "@/lib/api/api-config";

export const logout = http.post(
    apiEndpoint("/auth/logout"),
    () => {
        const session = AnonymousAuthSessionSchema.parse({ authenticated: false });

        setAuthSession(session);

        return HttpResponse.json(session);
    },
);