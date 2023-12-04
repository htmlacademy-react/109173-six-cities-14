import { GALLERY_IMAGES_MAX_COUNT } from '../../const';

type Images = string[];

type GalleryProps = {
  images: Images;
};

export default function Gallery({ images }: GalleryProps) {
  const galleryImages = images.slice(0, GALLERY_IMAGES_MAX_COUNT);

  return (
    <div className="offer__gallery-container container" data-testid="galleryElem">
      <div className="offer__gallery">
        {galleryImages.map((imageSrc) => (
          <div className="offer__image-wrapper" key={crypto.randomUUID()}>
            <img className="offer__image" src={`${ imageSrc }`} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>
  );
}
