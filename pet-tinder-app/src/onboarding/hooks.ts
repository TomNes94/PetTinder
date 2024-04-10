import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createSession, getSessionByCode, getSessionById } from "../api/session";
import { storeCode } from "../session/code.service";
import { getSessionIdFromStore, storeSessionId } from "../session/session.service";

export const useSessionMutation = () => {
  const queryClient = useQueryClient();

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: async (data) => {
      queryClient.setQueryData(["session"], data);
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return createSessionMutation;
};

export const useSessionByCodeQuery = (code?: string) => {
  const getSessionByCodeQuery = useQuery({
    queryFn: async () => await getSessionByCode(code ?? ""),
    queryKey: ["session"],
    enabled: !!code,
  });

  return getSessionByCodeQuery;
};

export const useSessionByIdQuery = (id: string | null) => {
  const getSessionByIdQuery = useQuery({
    queryFn: async () => await getSessionById(id ?? ""),
    queryKey: ["session"],
    enabled: !!id,
  });

  return getSessionByIdQuery;
};

export const useSessionIdMutation = () => {
  const queryClient = useQueryClient();

  const setSessionIdMutation = useMutation({
    mutationFn: async (sessionId: string) => await storeSessionId(sessionId),
    onSuccess: (data) => queryClient.setQueryData(["sessionId"], data),
  });

  return setSessionIdMutation;
};

export const useSessionIdQuery = () => {
  const getSessionIdQuery = useQuery({
    queryFn: getSessionIdFromStore,
    queryKey: ["sessionId"],
  });

  return getSessionIdQuery;
};

export const useSessionCodeMutation = () => {
  const queryClient = useQueryClient();

  const setSessionCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      return await storeCode(code);
    },
    onSuccess: (data) => queryClient.setQueryData(["code"], data),
  });

  return setSessionCodeMutation;
};

export const useSessionByCodeMutation = () => {
  const queryClient = useQueryClient();

  const getSessionByCodeQuery = useMutation({
    mutationFn: async (code: string) => await getSessionByCode(code),
    onSuccess: async (data) => {
      queryClient.setQueryData(["session"], data.data);
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return getSessionByCodeQuery;
};
