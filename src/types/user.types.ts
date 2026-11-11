export type UserPlan = "Starter" | "Pro" | "Premium" | (string & {});

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  plan: UserPlan;
}
