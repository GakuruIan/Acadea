import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface OnboardingStatus {
  has_completed_onboarding: boolean;
  role?: "student" | "tutor";
  profileId?: string;
}

const CheckingOnboardingStatus = async (): Promise<OnboardingStatus> => {
  const response = await axios.get("/api/profile/onboarding-status");

  return response.data;
};

export const useCheckOnboardingStatus = (
  userId?: string,
  options?: { enabled: boolean }
) => {
  return useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: CheckingOnboardingStatus,
    enabled: !!userId && (options?.enabled ?? true),
    staleTime: 5 * 60 * 100,
    retry: 2,
  });
};
