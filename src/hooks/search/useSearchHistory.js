import { useRecoilState, useResetRecoilState } from "recoil";
import { keywordsState } from "@recoil/keywords-state";

const useSearchHistory = () => {
  const [keywords, setKeywords] = useRecoilState(keywordsState);
  const resetKeywords = useResetRecoilState(keywordsState);

  const addKeyword = (text) => {
    setKeywords((prev) => {
      const newKeyword = { key: new Date(), text };
      return [...prev.filter((item) => item.text !== text), newKeyword].slice(-10);
    });
  };

  const removeKeyword = (key) => {
    setKeywords((prev) => prev.filter((item) => item.key !== key));
  };

  const removeKeywordAll = () => {
    resetKeywords();
  };

  return { keywords, addKeyword, removeKeyword, removeKeywordAll };
};

export default useSearchHistory;
