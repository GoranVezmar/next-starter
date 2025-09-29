import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

// TODO Logged in users should be able to access this
const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute top-0 left-0 flex w-full justify-between gap-2 p-4">
        <div className="text-2xl font-bold">Next Starter</div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
