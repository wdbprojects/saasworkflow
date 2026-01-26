import { requireUnauth } from "@/lib/auth-utils";
import RegisterPage from "@/modules/presentation/auth/register-page";

const RegisterPageMain = async () => {
  await requireUnauth();
  return <RegisterPage />;
};

export default RegisterPageMain;
