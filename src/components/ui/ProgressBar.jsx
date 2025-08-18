import React from 'react';

const ProgressBar = ({ totalQuestions, completedCount, progressPercentage }) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      />
      <div className="progress-text">
        {completedCount} of {totalQuestions} completed ({progressPercentage}%)
      </div>
    </div>
  );
};

export default ProgressBar;
