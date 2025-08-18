import React, { useState } from "react";
import {
  Layout,
  ProgressBar,
  SearchBar,
  BookmarkedQuestions,
  QuestionsList
} from "../components";

import { useQuestions, useDashboard } from "../hooks";

function Home() {
  const [expanded, setExpanded] = useState(null);
  
  // Use custom hooks for data management
  const { questions, loading, error, search, setSearch } = useQuestions();
  const {
    bookmarks,
    completedQuestions,
    handleBookmark,
    handleProgress,
    getProgressStats
  } = useDashboard();

  // Get progress statistics
  const { totalQuestions, completedCount, progressPercentage } = getProgressStats();

  // Toggle expand handler
  const toggleExpand = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  // Handle progress change with event extraction
  const handleProgressChange = (id, checked) => {
    handleProgress(id, checked);
  };

  return (
    <Layout 
      title="Interview Questions"
      subtitle="Click on any question to view learning resources"
    >
      {/* Progress Bar */}
      <ProgressBar
        totalQuestions={totalQuestions}
        completedCount={completedCount}
        progressPercentage={progressPercentage}
      />

      {/* Search Bar with Voice Recognition */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search questions... (or click 🎤 to speak)"
      />

      {/* Bookmarked Questions Section */}
      <BookmarkedQuestions
        bookmarks={bookmarks}
        expanded={expanded}
        onToggleExpand={toggleExpand}
        completedQuestions={completedQuestions}
        onProgressChange={handleProgressChange}
        onBookmark={handleBookmark}
      />

      {/* Divider */}
      <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid #e9ecef" }} />

      {/* All Questions */}
      <QuestionsList
        questions={questions}
        expanded={expanded}
        onToggleExpand={toggleExpand}
        completedQuestions={completedQuestions}
        onProgressChange={handleProgressChange}
        onBookmark={handleBookmark}
        loading={loading}
        error={error}
        emptyMessage="No questions found"
        keyPrefix="q"
      />
    </Layout>
  );
}

export default Home;
