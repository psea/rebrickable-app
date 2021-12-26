import { useEffect, useState, ChangeEvent } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { getAllPages, LegoThemesRead, rebrickable } from "../utils/rebrickable";
import useCachedLocalStorageState from '../utils/useCachedLocalStorageState';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0px;
  height: 3em;
  background-color: #ffcf00;
`;

function groupThemesByName(themes?: LegoThemesRead[]) {
  interface Theme {
    ids: number[],
    name: string,
  }

  if (!themes) 
    return [];

  return themes
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
}
interface ThemeSelectProps {
  onChange: (themeIds: number[]) => void,
}

function ThemeSelect({ onChange }: ThemeSelectProps) {
  const initThemes = async () => await getAllPages<LegoThemesRead>(rebrickable, '/api/v3/lego/themes/');

  const [themes, setThemes] = useCachedLocalStorageState<LegoThemesRead[]>('themes', initThemes);
  const [themeIds, setThemeIds] = useCachedLocalStorageState<number[]>('themeIds');

  useEffect( () => {
    if (themeIds)
      onChange(themeIds);
  }, [themeIds]); // themeIds could change when value is retrieved from LocalStorage cache or option selected

  // sort by name and group id's with the same name
  // TODO. we don't need to calculate this on each render. Find proper place for it. on themes update?
  const themesGroupByName = groupThemesByName(themes);

  function onOptionChange(e: ChangeEvent<HTMLSelectElement>) {
    setThemeIds(JSON.parse(e.target.value));
  }

  return (
    <Form>
      <select value={JSON.stringify(themeIds)} onChange={onOptionChange}>
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