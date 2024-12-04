import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ReviewStars } from './ReviewStars';
import type { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold">{review.userName}</div>
              <div className="text-sm text-gray-500">
                {format(new Date(review.date), "d 'de' MMMM, yyyy", { locale: es })}
              </div>
            </div>
            <ReviewStars rating={review.rating} />
          </div>
          <p className="text-gray-700">{review.comment}</p>
          {review.isVerified && (
            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Compra verificada
            </div>
          )}
        </div>
      ))}
    </div>
  );
}