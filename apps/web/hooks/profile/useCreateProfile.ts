import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { StudentData, TutorData } from "@/zodSchemas/zodSchemas";

type ProfileFormData = StudentData | TutorData;

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormData) => {
      try {
        const response = await axios.post("/api/profile", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Server responded with error status
          throw new Error(
            error.response.data?.error || "Failed to create profile"
          );
        } else if (axios.isAxiosError(error) && error.request) {
          // Request was made but no response received
          throw new Error("Network error. Please check your connection.");
        } else {
          // Something else happened
          throw new Error("An unexpected error occurred");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
