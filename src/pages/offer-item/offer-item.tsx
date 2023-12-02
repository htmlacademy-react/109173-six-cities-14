// import { useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import useOfferItem from '../../hooks/useOfferItem';
import useReview from '../../hooks/useReview';
import useNearbyOffer from '../../hooks/useNearbyOffer';

import Spinner from '../../components/spinner/spinner';
import CurrentOffer from '../../components/current-offer/current-offer';
import { Helmet } from 'react-helmet-async';

export default function OfferItem(): React.ReactElement {
  const offerId = String(useParams().id);
  const currentOffer = useOfferItem({ offerId });
  const comments = useReview({ offerId });
  const nearbyOffers = useNearbyOffer({ offerId });

  if(!currentOffer) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <CurrentOffer offer={ currentOffer } comments={ comments } nearby={ nearbyOffers }/>;
    </>
  );
}
