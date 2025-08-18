import React, { useState } from 'react';
import QuestionsList from './QuestionsList';

const BookmarkedQuestions = ({
  bookmarks,
  expanded,
  onToggleExpand,
  completedQuestions,
  onProgressChange,
  onBookmark
}) => {
  const [showBookmarks, setShowBookmarks] = useState(false);

  return (
    <div className="dashboard">
      <h2
        onClick={() => setShowBookmarks(!showBookmarks)}
        style={{ cursor: "pointer" }}
        className="bookmark-section-title"
      >
        ⭐ Bookmarked Questions {showBookmarks ? "▲" : "▼"}
      </h2>
      
      {showBookmarks && (
        <QuestionsList
          questions={bookmarks}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          completedQuestions={completedQuestions}
          onProgressChange={onProgressChange}
          onBookmark={onBookmark}
          loading={false}
          error={null}
          emptyMessage="No bookmarks yet."
          keyPrefix="bm"
        />
      )}
    </div>
  );
};

export default BookmarkedQuestions;
