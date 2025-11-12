import { useEffect, useState } from 'react';

const useFetch = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useFetch
  }, [initialValue]);

  return { state, setState };
};

export default useFetch;
