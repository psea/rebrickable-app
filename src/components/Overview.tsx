import { useState } from "react";
import LegoSets from "./LegoSets";
import ThemeSelect from "./ThemeSelect";

function Overview() {
  const [themeIds, setThemeIds] = useState<number[]>([]);

  return (
    <>
      <ThemeSelect onChange={setThemeIds}/> 
      <LegoSets themeIds={themeIds} />
    </>
  )
}

export default Overview;