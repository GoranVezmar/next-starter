import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { type JSX } from "react";

import { User } from "@/server/schemas/auth.schema";

import { auth } from "@/lib/auth";

type WithAuthReturn = Promise<JSX.Element | { props: Record<string, unknown> }>;

type WithAuthOptions =
  | {
      shouldUserExist: true;
      redirectUrl: string;
      handler: (user: User) => WithAuthReturn;
    }
  | {
      shouldUserExist: false;
      redirectUrl: string;
      handler: () => WithAuthReturn;
    };

export const withAuth = async ({ shouldUserExist, redirectUrl, handler }: WithAuthOptions) => {
  const headers = await nextHeaders();

  const session = await auth.api.getSession({ headers });

  const { user } = session || {};

  if (shouldUserExist && user) {
    return handler(user);
  } else if (shouldUserExist && !user) {
    return redirect(redirectUrl);
  } else if (!shouldUserExist && user) {
    return redirect(redirectUrl);
  } else if (!shouldUserExist && !user) {
    return handler();
  }
};
