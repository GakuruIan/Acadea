import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { StudentData, TutorData } from "@/zodSchemas/zodSchemas";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentData | TutorData) => {
      try {
        const formData = new FormData();

        // Object.entries(data).forEach(([key, value]) => {
        //   if (value === undefined || value === null) return;

        //   // Special handling for certifications
        //   if (
        //     key === "certifications" &&
        //     Array.isArray(value) &&
        //     value.every((v) => v instanceof File)
        //   ) {
        //     console.log("Processing certifications:", value.length, "files");
        //     value.forEach((file, index) => {
        //       console.log(`Adding certification ${index}:`, file.name);
        //       // Try different formats based on your backend
        //       formData.append("certifications", file); // Most common
        //       // OR: formData.append(`certifications[${index}]`, file);
        //       // OR: formData.append('certifications[]', file);
        //     });
        //   }
        //   // Handle other file arrays
        //   else if (
        //     Array.isArray(value) &&
        //     value.every((v) => v instanceof File)
        //   ) {
        //     value.forEach((file) => {
        //       formData.append(`${key}[]`, file);
        //     });
        //   }
        //   // Handle single files
        //   else if (value instanceof File) {
        //     formData.append(key, value);
        //   }
        //   // Handle regular arrays
        //   else if (Array.isArray(value)) {
        //     value.forEach((item) => {
        //       formData.append(`${key}[]`, item.toString());
        //     });
        //   }
        //   // Handle regular fields
        //   else {
        //     formData.append(key, value.toString());
        //   }
        // });

        // Debug FormData

        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return;

          if (Array.isArray(value) && value.every((v) => v instanceof File)) {
            value.forEach((file) => {
              formData.append(key, file);
            });
          } else if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(`${key}[]`, item.toString());
            });
          } else {
            formData.append(key, value.toString());
          }
        });

        const endpoint =
          data.role === "student"
            ? "/api/profile/student"
            : "/api/profile/tutor";

        const response = await axios.post(endpoint, formData);

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
