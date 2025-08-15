import { useState } from "react";
import { toast } from "sonner";
import api from "../../shared/services/apiService";

export default function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [predictedSentiment, setPredictedSentiment] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { rating, comment };

      const response = await api.POST<{ message: string; predicted_sentiment: string }, typeof payload>(
        "/feedback",
        payload
      );

      toast.success(response.message);
      setPredictedSentiment(response.predicted_sentiment);
    } catch (error) {
      console.error("Feedback error:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-700";
      case "neutral":
        return "bg-gray-100 text-gray-700";
      case "negative":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6">Share Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            How would you rate your experience?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${rating >= star
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => setRating(star)}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
            Your Comments
          </label>
          <textarea
            id="comment"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {/* Display Predicted Sentiment */}
      {predictedSentiment && (
        <div
          className={`mt-6 p-4 rounded-md border ${sentimentColor(predictedSentiment)} font-semibold`}
        >
          Predicted Sentiment: {predictedSentiment.toUpperCase()}
        </div>
      )}
    </div>
  );
}
