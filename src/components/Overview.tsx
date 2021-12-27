import { useState } from "react";
import LegoSetsList from "./LegoSetsList";
import ThemeSelect from "./ThemeSelect";

function Overview() {
  const [themeIds, setThemeIds] = useState<number[]>([]);

  return (
    <>
      <ThemeSelect onChange={setThemeIds}/> 
      <LegoSetsList themeIds={themeIds} />
    </>
  )
}

export default Overview;