import { useEffect, useState } from 'react';

const useHotels = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useHotels
  }, [initialValue]);

  return { state, setState };
};

export default useHotels;
