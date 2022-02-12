import { useParams } from 'react-router-dom';

interface BookParams {
  group: number;
  page: number;
}

const useBookParams = (): BookParams => {
  const params = useParams<keyof BookParams>();
  return {
    group: +params.group,
    page: +params.page,
  };
};

export default useBookParams;
