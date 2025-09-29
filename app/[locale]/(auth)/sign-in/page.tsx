import { withAuth } from "@/utils/with-auth";

import { SignInForm } from "@/components/auth/sign-in-form";

const SignInPage = async () => {
  return withAuth({
    handler: async () => <SignInForm />,
    shouldUserExist: false,
    redirectUrl: "/",
  });
};

export default SignInPage;
