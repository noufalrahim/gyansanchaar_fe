import { editData } from "@/api/services/updateData";
import { useMutation } from "@tanstack/react-query";

export const useModifyData = <T>(url: string) => {
    return useMutation<T, Error, T>({
        mutationFn: (data) => editData<T>(url, data),
    });
};