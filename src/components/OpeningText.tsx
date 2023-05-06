import React, { useEffect, useState } from 'react';
import { fetchOpeningText } from '../lib/fetchOpeningText';

const OpeningText = ({ pointId }: { pointId: number }) => {
  const [openingText, setOpeningText] = useState<string>();

  useEffect(() => {
    (async () => {
      const text = await fetchOpeningText(pointId);
      setOpeningText(text);
    })();
  }, [pointId]);

  return <p>{openingText ?? 'Loading...'}</p>;
};

export default OpeningText;
