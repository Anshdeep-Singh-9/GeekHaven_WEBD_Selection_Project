import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${id}`)
      .then(res => setCategory(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!category) return <p>Loading...</p>;

  const filteredQuestions = category.questions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{category.title}</h1>

      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div key={q._id} className="bg-white shadow-md p-4 rounded-xl">
            <h2 className="font-semibold text-lg">{q.title}</h2>
            <div className="mt-2 space-x-4">
              {q.url.yt_link && (
                <a
                  href={q.url.yt_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 hover:underline"
                >
                  YouTube
                </a>
              )}
              {q.url.p1_link && (
                <a
                  href={q.url.p1_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Practice 1
                </a>
              )}
              {q.url.p2_link && (
                <a
                  href={q.url.p2_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Practice 2
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
