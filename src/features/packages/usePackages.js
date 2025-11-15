import { useEffect, useState } from 'react';

const usePackages = (initialValue = null) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // TODO: implement usePackages
  }, [initialValue]);

  return { state, setState };
};

export default usePackages;
