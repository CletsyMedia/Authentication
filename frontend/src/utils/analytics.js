import ReactGA from 'react-ga';

export const initializeGA = () => {
  const trackingId = process.env.GA_TRACKING_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
  } else {
    console.error('Google Analytics tracking ID not found');
  }
}