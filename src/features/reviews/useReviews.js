import { useEffect, useState } from 'react';

const useReviews = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useReviews
  }, [initialValue]);

  return { state, setState };
};

export default useReviews;
