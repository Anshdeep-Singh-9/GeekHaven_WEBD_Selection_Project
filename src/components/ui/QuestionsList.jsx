import React from 'react';
import QuestionCard from './QuestionCard';

const QuestionsList = ({
  questions,
  expanded,
  onToggleExpand,
  completedQuestions,
  onProgressChange,
  onBookmark,
  loading,
  error,
  emptyMessage = "No questions found",
  keyPrefix = "q"
}) => {
  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="no-results">{emptyMessage}</div>;
  }

  return (
    <div className="questions-container">
      {questions.map((question, index) => (
        <QuestionCard
          key={question._id}
          question={question}
          index={index}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          completedQuestions={completedQuestions}
          onProgressChange={onProgressChange}
          onBookmark={onBookmark}
          keyPrefix={keyPrefix}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
