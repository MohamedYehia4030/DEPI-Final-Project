import { useEffect, useState } from 'react';

const useBookings = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useBookings
  }, [initialValue]);

  return { state, setState };
};

export default useBookings;
