import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { rebrickable, LegoSetsRead } from '../utils/rebrickable';
import { isSetLiked, toggleSetLike } from '../utils/user';

const Picture = styled.img`
  width: 20em;
  display: block;
`;

interface LikeButtonProps {
  readonly liked: boolean | undefined;
}

const LikeButton = styled.button<LikeButtonProps>`
  display: block;
  filter: ${(props) => props.liked ? "unset" : "grayscale(100%)" }
`;

function LegoSetDetails() {
  const [legoSet, setLegoSet] = useState<LegoSetsRead>();
  const [isLiked, setIsLIked] = useState<boolean>();
  const [theme, setTheme] = useState('');
  const urlParams = useParams();

  useEffect( () => {
    rebrickable
      .get<LegoSetsRead>(`/api/v3/lego/sets/${urlParams.setId}/`)
      .then(({data}) => {
        setLegoSet(data)
        setIsLIked(isSetLiked(data.set_num));
        return data;
      })
      .then((data) => 
        rebrickable.get(`/api/v3/lego/themes/${data.theme_id}/`)
      )
      .then(({data}) => {
        setTheme(data.name)
      });
  }, [urlParams.setId]);

  if (!legoSet) return <p>'Loading...'</p>;

  return (
    <>
      <Link to="/">back</Link>
      <article>
        <p>{legoSet.name}</p>
        <Picture src={legoSet.set_img_url} alt={legoSet?.name} />
        <p>Year: <span>{legoSet.year}</span></p>
        <p>Number of parts: {legoSet.num_parts}</p>
        <p>Theme: {theme} </p>
        <LikeButton liked={isLiked} onClick={() => setIsLIked(toggleSetLike(legoSet.set_num))}>Like ❤️</LikeButton>
      </article>
    </>
  ) 
}

export default LegoSetDetails;