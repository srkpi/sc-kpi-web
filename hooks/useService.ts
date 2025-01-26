import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { Service } from '@/types/service';

export const useService = (serviceId: string) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const { data } = await api.get<Service>(`/services/${serviceId}`);
      return data;
    },
  });
};
