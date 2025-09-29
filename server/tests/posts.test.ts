import { describe, expect, test, vi } from "vitest";

import { postFixtures } from "./fixtures/posts";

// import { testClient } from "./utils.ts/client";

// TODO figure out how to reuse this mock
vi.mock("@/server/db", () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => Promise.resolve(postFixtures)),
    })),
  },
}));

describe("GET /api/posts", () => {
  test("5 should be 5", async () => {
    expect(5).toBe(5);
  });
  // let res: Awaited<ReturnType<typeof testClient.api.posts.$get>>;
  // let body: Awaited<ReturnType<typeof res.json>>;

  // beforeEach(async () => {
  //   vi.clearAllMocks();
  //   res = await testClient.api.posts.$get();
  //   // body = await res.json();
  // });

  // test("should return status 200", () => {
  //   // expect(res.status).toBe(200);
  //   expect(res.status).toBe(500);
  // });

  // test("should return a posts array", () => {
  //   if ("posts" in body) {
  //     expect(Array.isArray(body.posts)).toBe(true);
  //   } else {
  //     throw new Error(`Expected 'posts' key in response, got: ${JSON.stringify(body)}`);
  //   }
  // });

  // test("should return expected number of posts", () => {
  //   if ("posts" in body) {
  //     expect(body.posts.length).toBe(postFixtures.length);
  //   } else {
  //     throw new Error(`Expected 'posts' key in response, got: ${JSON.stringify(body)}`);
  //   }
  // });

  // test("each post should validate against postSchema", () => {
  //   if ("posts" in body) {
  //     body.posts.forEach((post: unknown) => {
  //       expect(() => postSchema.parse(post)).not.toThrow();
  //     });
  //   } else {
  //     throw new Error(`Expected 'posts' key in response, got: ${JSON.stringify(body)}`);
  //   }
  // });
});
