import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProgram, deleteProgram, updateProgram } from "./program-service";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProgram,

    onSuccess: () => {
      // Invalidate all program lists
      queryClient.invalidateQueries({
        queryKey: ["programs"],
      });
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgram,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["programs"],
      });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgram,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["programs"],
      });
    },
  });
};
