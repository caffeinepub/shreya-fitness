import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContact(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
  });
}

export function useSignupNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.signupNewsletter(email);
    },
  });
}

export function useSubmitFreeTrial() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      goal: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.freeTrial(data.name, data.email, data.phone, data.goal);
    },
  });
}

export function useBookClass() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      className: string;
      date: string;
      time: string;
      userName: string;
      userEmail: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.bookClass(
        data.className,
        data.date,
        data.time,
        data.userName,
        data.userEmail,
      );
    },
  });
}
