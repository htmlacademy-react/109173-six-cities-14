type GalleryProps = {
  images: string[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((imageSrc) => (
          <div className="offer__image-wrapper" key={crypto.randomUUID()}>
            <img className="offer__image" src={`${ imageSrc }`} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}
