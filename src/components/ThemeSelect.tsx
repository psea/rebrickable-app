import { useEffect, ChangeEvent, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { getAllPages, LegoThemesRead, rebrickable } from "../utils/rebrickable";
import useCachedWebStorageState from '../utils/useCachedWebStorageState';

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
  const initThemes = useRef(async () => await getAllPages<LegoThemesRead>(rebrickable, '/api/v3/lego/themes/'));

  /**
   * Keep fetched themes between component mounts
   * solutions:
   * - [Simple] Lift themes up in the component hierarchy
   * - [As implemented] Save themes somewhere (browser storage here)
   * - [Preferable?] Opt in to React-query. It will handle caching 
   * - move to rebricable.ts module, do the fetching/caching/etc there. Cache Web API? Expose themes through some convenience API
   */
  const [themes] = useCachedWebStorageState<LegoThemesRead[]>('themes', initThemes.current, sessionStorage);

  /**
   * Keep selected themesIds between component mounts
   * solutions:
   * - [Simple] Lift themeIds up in the component hierarchy
   * - [As implemented] Save themeIds somewhere (browser storage here)
   * - Create "user preferences" module to deal with user specific state (user.ts) Provide reference to module with Context API, custom hook or reducer
   * - Embed selected themesIds in URL parameters for this route. e.i. alter current browser histrory, "back" button link taken from history.
   * 
   * This has a depencancy on themes. What if server data changes and saved themeIds is no longer in themes? Data mismatch!
   * Take a step back and rething architecture with given requirements.
   */
  const [themeIds, setThemeIds] = useCachedWebStorageState<number[]>('themeIds');

  useEffect( () => {
    if (themeIds)
      onChange(themeIds);
  }, [themeIds, onChange]); // themeIds could change when value is retrieved from LocalStorage cache or option selected

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
            {theme.name}
          </option>
        )} 
      </select>
    </Form>
  );
}

export default ThemeSelect;