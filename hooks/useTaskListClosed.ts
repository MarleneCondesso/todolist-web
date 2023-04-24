import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useTaskListClosed = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/task/tasksClosed', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return { 
        data, 
        error,
        isLoading,
        mutate
    }
};

export default useTaskListClosed;