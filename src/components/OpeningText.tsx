import React, { useEffect, useState } from 'react';
import { fetchOpeningText } from '../lib/fetchOpeningText';

interface OpeningTextProps {
  pointId: number;
}

const OpeningText: React.FC<OpeningTextProps> = ({ pointId }) => {
  const [openingText, setOpeningText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const text = await fetchOpeningText(pointId);
      setOpeningText(text);
    })();
  }, [pointId]);

  return <p>{openingText ?? 'Loading...'}</p>;
};

export default OpeningText;