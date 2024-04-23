import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { currentPageAtom } from "contexts/atoms/page";

export default function useResetPage(conditions) {
  const setCurrentPage = useSetAtom(currentPageAtom);

  useEffect(() => {
    setCurrentPage(1);
  }, [...conditions]);
}