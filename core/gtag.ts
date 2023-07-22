export const pageview = (url: string) => {
  window.gtag('config', `G-${process.env.NEXT_PUBLIC_GA_TRAKCING_ID}`, {
    page_path: url,
  });
};
