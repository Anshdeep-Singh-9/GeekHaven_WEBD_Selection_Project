import { useState, useEffect } from 'react';

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/Database/all`);
      const data = await res.json();
      setQuestions(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  // Search/filter questions
  const searchQuestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchQuestions();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/Database/search?q=${searchTerm}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setQuestions(data);
      setError(null);
    } catch (error) {
      console.error("Error filtering questions:", error);
      setError("Failed to search questions");
    } finally {
      setLoading(false);
    }
  };

  // Search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchQuestions(search);
    }, 300); // Debounce search

    return () => clearTimeout(debounceTimer);
  }, [search]);

  // Initial fetch
  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    search,
    setSearch,
    fetchQuestions,
    searchQuestions
  };
};

export default useQuestions;
