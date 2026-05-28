export function SkeletonCard() {
  return (
    <div className="movie-card">
      {/* poster */}
      <div
        className="skeleton"
        style={{
          width: '100%',
          height: 330,
          borderRadius: 18,
        }}
      />

      {/* content */}
      <div className="movie-content">
        <div
          className="skeleton"
          style={{
            height: 18,
            width: '70%',
            marginBottom: 10,
          }}
        />

        <div
          className="skeleton"
          style={{
            height: 14,
            width: '50%',
          }}
        />
      </div>
    </div>
  );
}