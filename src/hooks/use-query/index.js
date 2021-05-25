import { useLocation } from 'react-router-dom';

const useQuery = function useQueryHook() {
  return new URLSearchParams(useLocation().search);
};

export default useQuery;
