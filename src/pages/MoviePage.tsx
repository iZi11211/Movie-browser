import { useParams, useNavigate } from 'react-router-dom';

export function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="movie-page">
      <button onClick={() => navigate(-1)}>
        ← Powrót
      </button>

      <h2>Movie ID: {id}</h2>

      {/* tu później fetch szczegółów filmu */}
    </div>
  );
}