import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '../context/user_context';

const useDashboard = () => {
  const { currentUser } = useUser();
  const [bookmarks, setBookmarks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState({});

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const [bookmarksRes, progressRes] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/bookmarks?email=${currentUser}`
        ),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/progress?email=${currentUser}`
        ),
      ]);

      const bookmarksData = await bookmarksRes.json();
      const progressData = await progressRes.json();

      setBookmarks(bookmarksData);
      setProgress(progressData);

      const completedMap = {};

      // mark all progress questions as true ✅
      progressData.forEach((q) => {
        completedMap[q._id] = true;
      });

      // ensure bookmarks at least exist with default false
      bookmarksData.forEach((q) => {
        if (completedMap[q._id] === undefined) {
          completedMap[q._id] = false;
        }
      });

      setCompletedQuestions(completedMap);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  // Add bookmark
  const handleBookmark = async (question) => {
    if (!bookmarks.find((b) => b._id === question._id)) {
      setBookmarks([...bookmarks, question]);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/update_bookmarks?email=${currentUser}&questionId=${question._id}`
        );
        const message = await res.json();
        console.log(message);
        toast.success("Bookmark added successfully!");
      } catch (err) {
        console.error("Error updating bookmarks:", err);
        toast.error("Failed to add bookmark");
        // Revert the optimistic update
        setBookmarks(bookmarks.filter(b => b._id !== question._id));
      }
    } else {
      toast.info("Already bookmarked!");
    }
  };

  // Handle progress checkbox
  const handleProgress = async (id, checked) => {
    // Optimistic update
    setCompletedQuestions((prev) => ({
      ...prev,
      [id]: checked,
    }));

    try {
      if (checked) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/update_progress?email=${currentUser}&questionId=${id}`
        );
        toast.success("Marked as completed!");
      } else {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/remove_progress?email=${currentUser}&questionId=${id}`
        );
        toast.info("Marked as incomplete");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
      toast.error("Failed to update progress");
      // Revert the optimistic update
      setCompletedQuestions((prev) => ({
        ...prev,
        [id]: !checked,
      }));
    }
  };

  // Calculate progress statistics
  const getProgressStats = () => {
    const totalQuestions = 361;
    const completedCount = Object.values(completedQuestions).filter(Boolean).length;
    const progressPercentage = totalQuestions > 0 
      ? Math.round((completedCount / totalQuestions) * 100) 
      : 0;

    return {
      totalQuestions,
      completedCount,
      progressPercentage
    };
  };

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  return {
    bookmarks,
    progress,
    completedQuestions,
    handleBookmark,
    handleProgress,
    fetchDashboardData,
    getProgressStats
  };
};

export default useDashboard;
