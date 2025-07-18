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
    'In Transit',
    'Out for Delivery',
    'Delivered'
    ]

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
    <section id="tracking" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-lg mb-4 block">Track Your Shipment</span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Real-Time Shipment Tracking
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your tracking code to get real-time updates on your shipment status and location.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter tracking code (e.g., PWL-001, PWL-002)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={isLoading || !trackingCode}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
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
            <div className="bg-white rounded-xl shadow-lg p-8">
              {trackingResult?.error ? (
                <div className="text-center py-8">
                  <i className="ri-error-warning-line text-red-500 text-5xl mb-4"></i>
                  <p className="text-red-600 font-medium">{trackingResult.error}</p>
                  {/* <p className="text-gray-500 mt-2">Try: LGS001 or LGS002 for demo</p> */}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">Tracking: {trackingResult.id}</h3>
                      <p className="text-gray-600">Status: <span className="font-semibold text-orange-600">{trackingResult.status}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Estimated Delivery</p>
                      <p className="font-semibold text-slate-800">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* { trackingResult.progress === 'number' && (
                  )} */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-semibold text-orange-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Current Location</h4>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center">
                        <i className="ri-map-pin-line text-orange-500 text-xl mr-3"></i>
                        <div>
                          <p className="font-semibold text-slate-800">{trackingResult.from}</p>
                          <p className="text-gray-600 text-sm">Destination: {trackingResult.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Tracking Timeline</h4>
                    {trackingResult && Array.isArray(trackingResult.timeline) && (
                      <div className="space-y-4">
                        {trackingResult.timeline.filter(item => item.status && item.status.trim() !== '').map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div className={`w-4 h-4 rounded-full mt-1 mr-4 ${item.completed ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className={`font-medium ${item.completed ? 'text-slate-800' : 'text-gray-500'}`}>
                                {item.status}
                              </p>
                              <span className="text-sm text-gray-500">{item.currentDate}</span>
                            </div>
                            <p className="text-sm text-gray-600">{item.from}</p>
                          </div>
                        </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-slate-800 mb-2">Location Map</h5>
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