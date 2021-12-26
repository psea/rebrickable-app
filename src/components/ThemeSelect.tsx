import { useEffect, useState, ChangeEvent } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { getAllPages, LegoThemesRead, rebrickable } from "../utils/rebrickable";

const Form = styled.form`
  display: block;
  width: 100%;
  text-align: center;
  position: sticky;
  top: 2em;
  height: 3em;
  background-color: #ffcf00;
`;
interface ThemeSelectProps {
  onChange: (themeIds: number[]) => void,
}

function ThemeSelect({ onChange }: ThemeSelectProps) {
  const [themes, setThemes] = useState<LegoThemesRead[]>([]);
  const [themeIds, setThemeIds] = useState<string>();

  /**
   * Effects are for caching selected options in the browser local storage
   */
  useEffect(() => {
    const ids = localStorage.getItem('themeIds');
    if (ids) 
      setThemeIds(ids);
  }, []);

  useEffect(() => {
    if (themeIds) {
      localStorage.setItem('themeIds', themeIds);
      onChange(JSON.parse(themeIds));
    }
  }, [themeIds, onChange]);

  // fetch data on every component mount. Isn't it wasteful? Cache a response? Opt-in to React Query?
  useEffect( () => {
    (async () => {
      const themes = await getAllPages<LegoThemesRead>(rebrickable, '/api/v3/lego/themes/');
      setThemes(themes);
    })();
  }, []);

  interface Theme {
    ids: number[],
    name: string,
  }
  
  // sort by name and group id's with the same name
  const themesGroupByName = themes
    .sort( (a, b) => a.name.localeCompare(b.name) )
    .map( t => ({ids: [t.id], name: t.name}) )
    .reduce( (themes:Theme[], curr:Theme) => {
      const last = _.last(themes);
      if (last?.name === curr.name) {
        last.ids.push(curr.ids[0]);
        return themes;
      } else {
        return themes.concat(curr);
      }
    }, []);

  function onOptionChange(e: ChangeEvent<HTMLSelectElement>) {
    setThemeIds(e.target.value);
  }

  return (
    <Form>
      <select value={themeIds} onChange={onOptionChange}>
        <option value="">--Select a theme--</option>
        {themesGroupByName.map(theme => 
          <option 
            key={theme.ids[0]} 
            value={JSON.stringify(theme.ids)}
          >
            {theme.ids + ' ' + theme.name}
          </option>
        )} 
      </select>
    </Form>
  );
}

export default ThemeSelect;