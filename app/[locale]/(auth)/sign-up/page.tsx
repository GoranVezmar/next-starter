import { withAuth } from "@/utils/with-auth";

import { SignUpForm } from "@/components/auth/sign-up-form";

// Move this check into layout
const SignUpPage = async () => {
  return withAuth({
    handler: async () => <SignUpForm />,
    shouldUserExist: false,
    redirectUrl: "/",
  });
};

export default SignUpPage;
