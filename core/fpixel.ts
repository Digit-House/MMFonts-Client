export const pageview = (url: string) => {
  window.fbq('track', url);
};

export const fbEvent = (name: string, options = {}) => {
  window.fbq('track', name, options);
};
