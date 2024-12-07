import { energyApi } from "@apis/energy.api";
import { useStore } from "@stores";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
type UseGetEnergy = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>

const useGetEnergy = (options?: UseGetEnergy) => {
  const { token } = useStore((state) => state)
  console.log({token})
  const queryResult = useQuery({
    queryKey: ["energy"],
    queryFn: () => energyApi.getEnergy(),
    enabled: !!token,
    ...options,
  });
  return queryResult;
};

export default useGetEnergy;
