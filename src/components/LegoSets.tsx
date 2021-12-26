import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllPages, LegoSetsRead, rebrickable } from "../utils/rebrickable";
import { isSetLiked } from '../utils/user';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  padding: 1em;
`;

const LegoSet = styled.article`
  display: grid;
  grid-template-rows: 3em 1fr 1em;
  min-width: 12em;
  width: 12em;
  padding: 0.7em;
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
  const [legoSets, setLegoSets] = useState<LegoSetsRead[]>([]);

  useEffect( () => {
    if (!themeIds) return;

    (async () => {
      const setPromises = themeIds.map( id => 
          getAllPages<LegoSetsRead>(rebrickable, '/api/v3/lego/sets/', {theme_id: id})
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
              <header>{set.name}</header>
              <Picture src={set.set_img_url} alt={set.name} />
              <footer>
                <Link to={`/details/${set.set_num}`}>Details</Link>
                {isSetLiked(set.set_num) ? <span>❤️</span> : ''}
              </footer>
            </LegoSet>
        )
      }
    </Container>
  )
}

export default LegoSets;