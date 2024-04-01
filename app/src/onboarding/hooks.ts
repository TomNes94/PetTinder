import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createSession, getSessionByCode} from '../api/session';

export const useSessionMutation = () => {
  const queryClient = useQueryClient();

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      queryClient.setQueryData(['session'], data);
      queryClient.invalidateQueries({queryKey: ['session']});
    },
  });

  return createSessionMutation;
};

export const useSessionByCodeQuery = (code?: string) => {
  const getSessionByCodeQuery = useQuery({
    queryFn: () => getSessionByCode(code ?? ''),
    queryKey: ['session'],
    enabled: !!code,
  });

  return getSessionByCodeQuery;
};
