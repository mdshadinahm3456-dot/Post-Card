import React, { useEffect, useRef } from 'react';
import { APP_CONFIG } from '../config/appConfig';

interface AdSenseAdProps {
  /**
   * The official Google AdSense ad slot ID (data-ad-slot).
   */
  adSlot: string;
  /**
   * The official Google AdSense publisher ID (defaults to official ID ca-pub-2441817327998925).
   */
  adClient?: string;
  /**
   * Ad format: 'auto', 'fluid', 'rectangle', 'horizontal', 'vertical'. Default is 'auto'.
   */
  adFormat?: string;
  /**
   * Whether the ad is full-width responsive. Default is true.
   */
  fullWidthResponsive?: boolean;
  /**
   * Optional in-article or in-feed layout key
   */
  adLayoutKey?: string;
  /**
   * Optional layout style (e.g. in-article)
   */
  adLayout?: string;
  /**
   * Additional container CSS classes
   */
  className?: string;
  /**
   * Container or ins style overrides
   */
  style?: React.CSSProperties;
  /**
   * Optional compliance label text (default: 'বিজ্ঞাপন • ADVERTISEMENT')
   */
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adClient = APP_CONFIG.adsensePublisherId || 'ca-pub-2441817327998925',
  adFormat = 'auto',
  fullWidthResponsive = true,
  adLayoutKey,
  adLayout,
  className = '',
  style,
  label = 'বিজ্ঞাপন • ADVERTISEMENT'
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushedRef = useRef(false);

  useEffect(() => {
    // If adSlot is not provided, do not initialize
    if (!adSlot) return;

    // Prevent duplicate push calls for this element instance
    if (isPushedRef.current) return;

    // Prevent duplicate initialization if AdSense already processed this ins element
    if (adRef.current && adRef.current.getAttribute('data-adsbygoogle-status')) {
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushedRef.current = true;
      }
    } catch (error) {
      // Gracefully catch ad-blocker or script load delays without interrupting execution
      if (process.env.NODE_ENV === 'development') {
        console.warn('AdSense notice:', error);
      }
    }
  }, [adSlot]);

  // Do not render anything if adSlot is missing
  if (!adSlot) {
    return null;
  }

  return (
    <div
      className={`w-full my-8 sm:my-10 flex flex-col items-center justify-center overflow-hidden clear-both ${className}`}
      aria-label="Advertisement Container"
    >
      {/* Required Policy-Compliant Label */}
      <div className="w-full text-center pb-2 select-none pointer-events-none">
        <span className="text-[11px] tracking-wider uppercase text-[#8c7a6b] font-sans font-medium">
          {label}
        </span>
      </div>

      {/* Manual Display Ad Unit Container */}
      <div className="w-full max-w-full flex justify-center items-center min-h-[100px] overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', ...(style || {}) }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          {...(adLayoutKey ? { 'data-ad-layout-key': adLayoutKey } : {})}
          {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
        />
      </div>
    </div>
  );
};
