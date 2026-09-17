import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { queryClient } from "@/lib/query-client";
import { server } from "@/mocks/server";
import { resetMockState } from "@/mocks/utils";

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
    server.resetHandlers();
    resetMockState();
    queryClient.clear();
});

afterAll(() => {
    server.close();
});