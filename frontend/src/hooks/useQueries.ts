import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Question, Result } from '../backend';

export function useAllQuestions() {
  const { actor, isFetching } = useActor();

  return useQuery<Question[]>({
    queryKey: ['questions', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuestions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useQuestionsByTopic(topic: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Question[]>({
    queryKey: ['questions', 'topic', topic],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestionsByTopic(topic);
    },
    enabled: !!actor && !isFetching && !!topic,
    staleTime: 1000 * 60 * 10,
  });
}

export function useResults() {
  const { actor, isFetching } = useActor();

  return useQuery<Result[]>({
    queryKey: ['results'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResults();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 30,
  });
}
