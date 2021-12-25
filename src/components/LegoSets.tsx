import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllPages, LegoSetResponse, rebrickable } from "../utils/rebrickable";
import { isSetLiked } from '../utils/user';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const LegoSet = styled.article`
  min-width: 10em;
  width: 10em;
  border: 1px solid #dcdde0;
  box-shadow: 1px 2px 3px rgba(220,221,224,0.6);
`;

const Picture = styled.img`
  width: 100%;
`;

interface LegoSetsProps {
  themeIds?: number[];
}

function LegoSets({themeIds}: LegoSetsProps ) {
  const [legoSets, setLegoSets] = useState<LegoSetResponse[]>([]);

  useEffect( () => {
    if (!themeIds) return;

    (async () => {
      const setPromises = themeIds.map( id => 
          getAllPages<LegoSetResponse>(rebrickable, '/api/v3/lego/sets/', {theme_id: id})
        );
      const sets = await Promise.all(setPromises);
      setLegoSets(sets.flat());
    })();
  }, [themeIds]);

  return (
    <Container>
      {
        legoSets.map(set =>
            <LegoSet key={set.set_num}>
              <p>{set.name}</p>
              <Picture src={set.set_img_url} alt={set.name} />
              <Link to={`/details/${set.set_num}`}>Details</Link>
              {isSetLiked(set.set_num) ? <span>❤️</span> : ''}
            </LegoSet>
        )
      }
    </Container>
  )
}

export default LegoSets;