import React, { useState } from 'react';
import { ReviewStars } from './ReviewStars';

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu valoración
        </label>
        <ReviewStars
          rating={rating}
          interactive
          onRatingChange={setRating}
          size={6}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu comentario
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 min-h-[100px]"
          placeholder="Comparte tu experiencia..."
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
      >
        Enviar reseña
      </button>
    </form>
  );
}