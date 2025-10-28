import toast from "react-hot-toast";
import { AxiosError } from "axios";

export function handleApiError(error: unknown): never {
  console.error("[API Error]:", error);

  if (error instanceof AxiosError) {
    if (error.response) {
      const message = (error.response.data as any)?.message || `Request failed with status ${error.response.status}`;
      toast.error(message);
    } else if (error.request) {
      toast.error("Network error. Check your connection.");
    } else {
      toast.error(error.message || "Unexpected request error.");
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("Something went wrong.");
  }

  throw error;
}
