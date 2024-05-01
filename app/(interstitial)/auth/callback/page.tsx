import { AuthCallbackChecker } from "@/components/auth";

export default function SignInCallback() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <AuthCallbackChecker />
    </div>
  );
}
