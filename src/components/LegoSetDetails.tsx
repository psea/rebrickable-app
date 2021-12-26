import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { rebrickable, LegoSetsRead, LegoThemesRead } from '../utils/rebrickable';
import { isSetLiked, toggleSetLike } from '../utils/user';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Picture = styled.img`
  width: 30em;
  display: block;
`;

const Details = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
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
  const [isLiked, setIsLiked] = useState<boolean>();
  const [theme, setTheme] = useState('');
  const urlParams = useParams();

  useEffect( () => {
    (async () => {
      const {data: set} = await rebrickable.get<LegoSetsRead>(`/api/v3/lego/sets/${urlParams.setId}/`);
      setLegoSet(set);
      setIsLiked(isSetLiked(set.set_num));

      const {data: theme} = await rebrickable.get<LegoThemesRead>(`/api/v3/lego/themes/${set.theme_id}/`);
      setTheme(theme.name);
    })();
  }, [urlParams.setId]);

  if (!legoSet) return <p>'Loading...'</p>;

  return (
    <>
      <Link to="/">back</Link>
      <Article>
        <header>{legoSet.name}</header>
        <Picture src={legoSet.set_img_url} alt={legoSet?.name} />
        <Details style={{margin: '0.5em'}}>
          <p>Year: {legoSet.year}</p>
          <p>Number of parts: {legoSet.num_parts}</p>
          <p>Theme: {theme}</p>
          <LikeButton 
            liked={isLiked} 
            onClick={() => setIsLiked(toggleSetLike(legoSet.set_num))}
          >
            Like ❤️
          </LikeButton>
        </Details>
      </Article>
    </>
  ) 
}

export default LegoSetDetails;