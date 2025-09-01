import React from "react";
import { SortProvider } from "./SortContext";
import { GenreProvider } from "./GenreContext";
import { PageProvider } from "./PageContext";

// 모든 Provider를 조합하는 컴포넌트
export const MovieFilterProvider = ({ children }) => {
  return (
    <SortProvider>
      <GenreProvider>
        <PageProvider>
          {children}
        </PageProvider>
      </GenreProvider>
    </SortProvider>
  );
};
