import { ReactNode } from "react";
import { User as AuthUser } from "better-auth";

export type LayoutPropsMain = {
  children: ReactNode;
};

export interface ISidebarProps {
  user: AuthUser | null | undefined;
}
