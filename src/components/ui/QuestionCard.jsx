import React from 'react';

const QuestionCard = ({ 
  question, 
  index, 
  expanded, 
  onToggleExpand, 
  completedQuestions, 
  onProgressChange, 
  onBookmark,
  keyPrefix = "q"
}) => {
  const cardKey = `${keyPrefix}-${index}`;
  const isExpanded = expanded === cardKey;
  const isCompleted = completedQuestions[question._id] || false;

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onProgressChange(question._id, e.target.checked);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onBookmark(question);
  };

  return (
    <div
      className={`card ${isExpanded ? "expanded" : ""} ${isCompleted ? "completed" : ""}`}
      onClick={() => onToggleExpand(cardKey)}
    >
      <div className="card-header">
        <div className="question-title-container">
          <input
            type="checkbox"
            className="complete-checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
          <h2>{question.title}</h2>
        </div>
        <span className="expand-icon">
          {isExpanded ? "−" : "+"}
        </span>
      </div>

      {isExpanded && (
        <div className="card-content">
          <button
            className="bookmark-button"
            onClick={handleBookmarkClick}
          >
            ⭐ Add to Bookmarks
          </button>
          
          {/* Learning Resources Links */}
          <div className="links">
            {question.url?.yt_link && (
              <a
                href={question.url.yt_link}
                target="_blank"
                rel="noreferrer"
                className="link-button youtube"
                onClick={(e) => e.stopPropagation()}
              >
                YouTube
              </a>
            )}
            {question.url?.p1_link && (
              <a
                href={question.url.p1_link}
                target="_blank"
                rel="noreferrer"
                className="link-button page1"
                onClick={(e) => e.stopPropagation()}
              >
                Documentation
              </a>
            )}
            {question.url?.p2_link && (
              <a
                href={question.url.p2_link}
                target="_blank"
                rel="noreferrer"
                className="link-button page2"
                onClick={(e) => e.stopPropagation()}
              >
                Tutorial
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
