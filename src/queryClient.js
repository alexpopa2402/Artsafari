import { QueryClient } from '@tanstack/react-query';
//import { persistQueryClient } from '@tanstack/react-query-persist-client';
//import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes until data becomes stale
        cacheTime: 60 * 60 * 1000, // Keep cached data for 1 hour
        refetchOnWindowFocus: false, // Disable refetch on tab switches
        refetchOnMount: false, // Disable refetch when component remounts
        refetchOnReconnect: true // Optional: Disable refetch on network reconnect
      }
    }
  });

// Persist cache to localStorage

//  const localStoragePersister = createSyncStoragePersister({
//      storage: window.localStorage
//    });
//
//    persistQueryClient({
//      queryClient,
//      persister: localStoragePersister
//    });

export default queryClient;