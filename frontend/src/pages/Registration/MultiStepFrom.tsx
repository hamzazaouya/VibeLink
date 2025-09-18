// hooks/useMultiStepForm.ts
import { useState } from "react";
import { ReactElement } from "react";

export default function useMultiStepForm(pages: ReactElement[]) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  function next() {
    setCurrentPageIndex((i) => (i >= pages.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentPageIndex((i) => (i <= 0 ? i : i - 1));
  }

  function goTo(index: number) {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index);
    }
  }

  return {
    currentPageIndex,
    currentPage: pages[currentPageIndex],
    back,
    next,
    goTo,
  };
}
