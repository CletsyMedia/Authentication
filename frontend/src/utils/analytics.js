export const initializeGA = () => {
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

  if (!trackingId) {
    console.error('GA Tracking ID not found');
    return;
  }

  // Load the Google Analytics script only once
  if (!window.gtag) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', trackingId);
    };
    document.head.appendChild(script);
  }
};
