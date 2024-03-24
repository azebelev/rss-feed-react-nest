export const standardizeFeedUrl = (feedUrl: string): string => {
  const index = feedUrl.indexOf('?');
  return index !== -1 ? feedUrl.substring(0, index) : feedUrl;
};
