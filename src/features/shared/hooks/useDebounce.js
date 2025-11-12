import { useEffect, useState } from 'react';

const useDebounce = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useDebounce
  }, [initialValue]);

  return { state, setState };
};

export default useDebounce;
