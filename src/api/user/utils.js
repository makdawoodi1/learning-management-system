import parseLinkHeader from 'parse-link-header';

export const wrapResponseWithLink = (data, link) => {
  const links = parseLinkHeader(link);

  return {
    response: data,
    ...links
  }
}