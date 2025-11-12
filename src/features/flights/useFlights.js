import { useEffect, useState } from 'react';

const useFlights = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement useFlights
  }, [initialValue]);

  return { state, setState };
};

export default useFlights;
