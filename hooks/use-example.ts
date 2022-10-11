import { useState } from "react";

export const useExample = () => {
  const [someData, setSomeData] = useState<string>("");
  return { someData };
};
