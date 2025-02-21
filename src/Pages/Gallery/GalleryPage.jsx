import './GalleryPage-style.css';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import { useFetchArtworks } from '@hooks/api/useFetchArtworks';

const GalleryPage = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useFetchArtworks(true);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading artworks</div>;
  }

  return (
    <div className="gallery-container">
      <div className="product-grid">
        {data.pages.map((page) =>
          page.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} artistName={artwork.artistName} />
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

console.log('Rendering Gallery component');
export default GalleryPage;