import { GoogleAnalytics } from '@next/third-parties/google';
import Umami from './Umami';
import Clarity from '@microsoft/clarity';

const Metrics = () => {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID as string;

  Clarity.init(projectId);
  return (
    <>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRAKCING_ID as string} />
      <Umami />
    </>
  );
};

export default Metrics;
