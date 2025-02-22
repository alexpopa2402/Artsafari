import ArtistCard from '@components/UI/artist-card/ArtistCard';
import './ArtistsPage-style.css';
import Spinner from '@components/loaders/spinners/SpinnerGlobal/Spinner';
import { useFetchAllProfiles } from '@hooks/apiHooks/useFetchAllProfiles';

const ArtistsPage = () => {

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useFetchAllProfiles();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="artists-page">
      <div className="artist-cards-container">
        {data.pages.map((page) =>
          page.map((artist) => (
            <ArtistCard
              key={artist.id}
              name={artist.full_name}
              description={artist.about}
              imageUrl={artist.avatar_url}
              profession={artist.profession}
              positions={artist.positions}
            />
          ))
        )}
      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default ArtistsPage;