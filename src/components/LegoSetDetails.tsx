import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { rebrickable, LegoSetResponse } from '../utils/rebrickable';
import { isSetLiked, toggleSetLike } from '../utils/user';

const Picture = styled.img`
  width: 10em;
  display: block;
`;

interface LikeButtonProps {
  readonly liked: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: block;
  filter: ${(props) => props.liked ? "unset" : "grayscale(100%)" }
`;

function LegoSetDetails() {
  const [legoSet, setLegoSet] = useState<LegoSetResponse>();
  const [setLiked, setSetLiked] = useState<boolean>(false);
  const params = useParams();

  useEffect( () => {
    rebrickable
      .get<LegoSetResponse>(`/api/v3/lego/sets/${params.setId}/`)
      .then(({data}) => setLegoSet(data));
  }, []);

  useEffect( () => {
    setSetLiked(isSetLiked(legoSet?.set_num))
  }, [legoSet]);

  if (!legoSet) return <p>'Loading...'</p>;

  return (
    <>
      <p>{legoSet.name}</p>
      <p>{legoSet.year}</p>
      <p>Theme name here: {legoSet.theme_id}</p>
      <Picture src={legoSet.set_img_url} alt={legoSet?.name} />
      <LikeButton liked={setLiked} onClick={() => setSetLiked(toggleSetLike(legoSet.set_num))}>Like ❤️</LikeButton>
      <Link to="/">Main</Link>
    </>
  ) 
}

export default LegoSetDetails;