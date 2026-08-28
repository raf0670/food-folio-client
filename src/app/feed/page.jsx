'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { getFeed } from '@/actions/feedActions';
import { getCurrentUser } from '@/actions/userActions';
import MyRestaurantPreview from '@/components/restaurants/MyRestaurantPreview';

export default function FeedPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [radius, setRadius] = useState(10);           // default 10 km

    const [location, setLocation] = useState({ lat: null, lng: null, city: null, country: null, isReady: false });

useEffect(() => {
        const loadLocation = async () => {

            const user = await getCurrentUser();
            const ucity = user?.city || 'Dhaka'; // Uses user's city if available, otherwise Dhaka
            const ucountry = user?.country || 'Bangladesh';

             // 2. Try to get browser location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude, city: null, country: null, isReady: true })
                    },
                    (error) => {
                        console.log("Location access denied, falling back to user's city:", ucity);
                        setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true }); 
                        // Uses dynamic city
                    }
                );
            } else {
                setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true });
            }
        };

        loadLocation();
    }, []);              // [] - it means the code will run only once after loading of page

    useEffect(() => {
        if (location.isReady) {
            const fetchFeedData = async () => {
                setIsLoading(true);
                
                const data = await getFeed(location.lat, location.lng, location.city, location.country, radius);
                
                setReviews(data);
                setIsLoading(false);
            };
            
            fetchFeedData();
        }
    }, [location, radius]);  //this is dependency array

    // loading animation
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    // design after data coming
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Header of page */}
            <div className="flex items-center gap-2 mb-8 border-b border-orange-100 pb-4">
                <MapPin className="w-6 h-6 text-orange-500" />
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Food Spots Around You
                </h1>
            </div>

            <div className="mb-8 bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Search Radius</label>
                <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{radius} km</span>
            </div>
                <input 
                type="range" 
                min="1" max="50" 
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full cursor-pointer accent-orange-500"
                />
            </div>


            {/* showing reviews in a loop using map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <MyRestaurantPreview key={review.review_id} restaurant={review} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full py-10">
                        No food spots found in this area yet. Be the first to add one!
                    </p>
                )}
            </div>
        </div>
    );
}