import axios, { AxiosResponse } from 'axios';

interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
      };
    };
  };
}

export const wikipediaCache = new Map<number, string>();

export const fetchOpeningText = async (id: number): Promise<string> => {
  // If the content is already in the cache, return it
  if (wikipediaCache.has(id)) {
    return wikipediaCache.get(id) ?? '';
  }

  try {
    const response: AxiosResponse<WikipediaResponse> = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        prop: 'extracts',
        format: 'json',
        exintro: 1,
        explaintext: 1,
        pageids: id,
        origin: '*',
      },
    });

    const pages = response.data.query.pages;
    const page = Object.values(pages)[0];
    const extract = page.extract;

    // Save the content to the cache before returning
    wikipediaCache.set(id, extract);
    return extract;
  } catch (error) {
    console.error('Error fetching Wikipedia data:', error);
    return '';
  }
}