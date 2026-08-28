'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { getFeed } from '@/actions/feedActions';
import MyRestaurantPreview from '@/components/restaurants/MyRestaurantPreview';

export default function FeedPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeedData = async (lat, lng, city) => {
            const data = await getFeed(lat, lng, city, 'Bangladesh');
            setReviews(data);
            setIsLoading(false);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    fetchFeedData(lat, lng, null);
                },
                (error) => {
                    console.log("Location access denied, falling back to city.");
                    fetchFeedData(null, null, 'Dhaka');
                }
            );
        } else {
            fetchFeedData(null, null, 'Dhaka');
        }
    }, []); // [] it means the code will run only once after loading of page

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