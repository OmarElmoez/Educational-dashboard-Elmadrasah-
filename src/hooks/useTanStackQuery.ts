import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type TFilters = Record<string, unknown>;

type TResponseData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  status?: number;
};

type TProps<T> = {
  queryKeyPrefix: string;
  fetchFn: (params: { page: number } & TFilters) => Promise<TResponseData<T>>;
  filters?: TFilters | null;
  staleTime?: number;
  initialPage?: number;
};

type THookResponse<T> = {
  page: number;
  setPage: (page: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
  goToPage: (page: number) => void;
  data: TResponseData<T> | undefined;
  isPending: boolean;
  isFetching: boolean;
  error: Error | null;
};

const useTanStackQuery = <T>({
  queryKeyPrefix,
  fetchFn,
  filters,
  staleTime = 0.5 * 60 * 1000,
  initialPage = 1,
}: TProps<T>): THookResponse<T> => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(initialPage);

  const params = useMemo(() => ({ page, filters }), [page, filters]);

  const queryKey = [queryKeyPrefix, params];

  const { data, isFetching, isPending, error } = useQuery({
    queryKey,
    queryFn: () => fetchFn(params),
    staleTime,
  });


  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (data?.next) {
      const nextPageNumber = page + 1;
      const nextPageParams = { ...params, page: nextPageNumber };
      const nextPageQueryKey = [queryKeyPrefix, nextPageParams];

      if (!queryClient.getQueryData(nextPageQueryKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageQueryKey,
          queryFn: () => fetchFn(nextPageParams),
        });
      }
    }
  }, [data, page, queryKeyPrefix, filters, params, queryClient, fetchFn]);

  return {
    page,
    setPage,
    increasePage,
    decreasePage,
    goToPage,
    data,
    isPending,
    isFetching,
    error,
  };
};

export default useTanStackQuery;
