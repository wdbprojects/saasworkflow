import { routes } from "@/config/routes";
import { requireUnauth } from "@/lib/auth-utils";
import LoginPage from "@/modules/presentation/auth/login-page";

const LoginPageMain = async () => {
  await requireUnauth();
  return <LoginPage />;
};

export default LoginPageMain;
