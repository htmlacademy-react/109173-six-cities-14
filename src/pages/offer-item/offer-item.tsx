// import { useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import useOfferItem from '../../hooks/useOfferItem';
import useReview from '../../hooks/useReview';
import useNearbyOffer from '../../hooks/useNearbyOffer';

import Spinner from '../../components/spinner/spinner';
import CurrentOffer from '../../components/current-offer/current-offer';

export default function OfferItem(): React.ReactElement {
  const offerID = String(useParams().id);
  const currentOffer = useOfferItem({ offerID });
  const comments = useReview({ offerID });
  const nearbyOffers = useNearbyOffer({ offerID });

  if(!currentOffer) {
    return <Spinner />;
  }

  return <CurrentOffer offer={ currentOffer } comments={ comments } nearby={ nearbyOffers }/>;
}
