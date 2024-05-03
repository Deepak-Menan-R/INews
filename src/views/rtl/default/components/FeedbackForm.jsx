import React, { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Feedback:', feedback);

    try {
      // Send POST request to backend endpoint
      const user_id = localStorage.getItem('user_id');
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, user_id }),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        // Clear the feedback input after successful submission
        setFeedback('');
        // Display alert message
        window.alert('Feedback submitted successfully!');
      } else {
        console.error('Error submitting feedback:', response.statusText);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle network errors
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Feedback Form */}
      <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-6 text-4xl font-bold text-navy-700 dark:text-white">Feedback</h4>
        <p className="mb-6 text-base text-gray-600">Enter your feedback and reviews for a better experience!</p>

        {/* Feedback */}
        <textarea
          className="w-full p-3 mb-6 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          placeholder="Write your feedback here"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          className="w-full py-3 rounded-xl bg-brand-500 text-white font-medium transition duration-200 hover:bg-brand-600 focus:outline-none focus:bg-brand-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
