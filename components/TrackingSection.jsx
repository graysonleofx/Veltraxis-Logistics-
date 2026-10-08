'use client';

import { useState } from 'react';
import supabase  from '@/lib/supabaseClient';

export default function TrackingSection() {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () =>{
    if (!trackingCode) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('Shipments')
        .select('*')
        .eq('id', trackingCode.toUpperCase())
        .single();
      // console.log('Tracking Data:', data);
      if (error) {
        setTrackingResult({ error: 'Tracking code not found. Please check your tracking number.' });
      } else {
        setTrackingResult(data);
    }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setTrackingResult({ error: 'Failed to fetch tracking data. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = (timeline) => {
    if (!Array.isArray(timeline) || timeline.length === 0) {
      return 0;
    }

    const validSteps = [
      'Dispatched',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];


    const uniqueStatuses = new Set();

    for(const item of timeline) {
      if(validSteps.includes(item?.status)){
        uniqueStatuses.add(item.status)
      }
    }    
    // const totalSteps = timeline;

    // const completedSteps = timeline.filter(item => totalSteps.includes(item.status)).length;

    const completedSteps = uniqueStatuses.size;
    const totalSteps = validSteps.length;

    return Math.min(Math.round((completedSteps / totalSteps) * 100), 100);
  };

  const progress = trackingResult?.timeline ? calculateProgress(trackingResult.timeline) : 0;

  return (
    <section id="tracking" className="py-20 bg-bg-main">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-red-primary font-semibold text-lg mb-4 block">Track Your Shipment</span>
          <h2 className="text-4xl font-bold text-text-white mb-4">
            Track Your Package Instantly
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Provide your tracking code to view the latest updates on your shipment's status and location.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-bg-secondary rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter tracking code (e.g., TRK-0011222)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="w-full px-4 py-3 border border-text-muted rounded-full focus:ring-2 focus:ring-red-primary focus:border-transparent outline-none text-sm bg-bg-main text-text-white placeholder:text-text-muted"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={isLoading || !trackingCode}
                className="bg-red-primary hover:bg-red-hover disabled:bg-text-muted text-text-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Tracking...
                  </div>
                ) : (
                  'Track Now'
                )}
              </button>
            </div>
          </div>

          {trackingResult && (
            <div className="bg-bg-secondary rounded-xl shadow-lg p-8">
              {trackingResult?.error ? (
                <div className="text-center py-8">
                  <i className="ri-error-warning-line text-red-primary text-5xl mb-4"></i>
                  <p className="text-red-primary font-medium">{trackingResult.error}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-text-muted">
                    <div>
                      <h3 className="text-2xl font-bold text-text-white">Tracking Code: {trackingResult.id}</h3>
                      <p className="text-text-muted">Current Status: <span className={`font-semibold text-red-primary`}>{trackingResult.status}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-muted">Estimated Delivery</p>
                      <p className="font-semibold text-text-white">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-muted">Shipment Progress</span>
                      <span className="text-sm font-semibold text-red-primary">{progress}%</span>
                    </div>
                    <div className="w-full bg-text-muted rounded-full h-3">
                      <div 
                        className="bg-red-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 mb-8">
                    {/* Origin Card */}
                    <div className="bg-bg-secondary border border-dashed border-text-muted rounded-lg p-6 shadow-sm max-w-md mx-auto relative overflow-hidden w-full">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-primary/10 rounded-l-lg"></div>
                      <div className="flex items-center mb-2">
                        <i className="ri-map-pin-line text-red-primary text-2xl mr-3"></i>
                        <span className="font-bold text-text-white text-lg">{trackingResult.from}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-muted mb-1">
                        <span>Status:</span>
                        <span className="font-semibold text-red-primary">{trackingResult.status}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-muted mb-1">
                        <span>Sender:</span>
                        <span className="font-semibold text-red-primary">{trackingResult.senderName}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-muted">
                        <span>Date:</span>
                        <span>{trackingResult.currentDate ? new Date(trackingResult.currentDate).toLocaleString() : '-'}</span>
                      </div>
                      <div className="border-t border-dashed border-text-muted mt-4 pt-2 text-xs text-text-muted text-center">
                        Current Location
                      </div>
                    </div>
                    {/* Destination Card */}
                    <div className="bg-bg-secondary border border-dashed border-text-muted rounded-lg p-6 shadow-sm max-w-md mx-auto relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full w-2 bg-red-primary/10 rounded-l-lg"></div>
                      <div className="flex items-center mb-2">
                        <i className="ri-flag-2-line text-red-primary text-2xl mr-3"></i>
                        <span className="font-bold text-text-white text-lg">{trackingResult.to}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-muted mb-1">
                        <span>Estimated Delivery:</span>
                        <span className="font-semibold text-text-white">{trackingResult.estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-muted">
                        <span>Status:</span>
                        {trackingResult.status === 'On Hold' ? (
                          <span className="font-semibold bg-red-primary/10 text-red-primary">{trackingResult.status}</span>
                        ) : (
                          <span className="font-semibold text-red-primary">{trackingResult.status}</span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm text-text-muted">
                        <span>Recipient:</span>
                        <span className="font-semibold text-red-primary">{trackingResult.receiverName}</span>
                      </div>
                      <div className="border-t border-dashed border-text-muted mt-4 pt-2 text-xs text-text-muted text-center">
                        Destination
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-red-primary/10 rounded-lg">
                    <h5 className="font-semibold text-text-white mb-2">Map Location</h5>
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(trackingResult.from)}&output=embed`}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}