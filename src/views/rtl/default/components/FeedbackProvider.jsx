// FeedbackProvider.jsx
import React, { createContext, useState } from 'react';

const initialFeedbackState = {
  feedback: [],
  addFeedback: () => {},
  // Add other functions as needed
};

export const FeedbackContext = createContext(initialFeedbackState);

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);

  const addFeedback = (newFeedback) => {
    setFeedback((prevFeedback) => [...prevFeedback, newFeedback]);
  };

  // Add other functions as needed

  return (
    <FeedbackContext.Provider value={{ feedback, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
