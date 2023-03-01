import { useCallback, useRef } from "react";
import { incrementPage } from "../store/slices/resultsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import ItunesResult from "./itunes-result";
import BackToTop from "./back-to-top";
import Loader from "./loader";
import NoResults from "./no-results";
import styles from "./scroller.module.css";

export default function Scroller() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.results.loading);
  const page = useAppSelector((state) => state.results.currentPage);
  const pageSize = useAppSelector((state) => state.results.pageSize);
  const totalPages = useAppSelector((state) => state.results.totalPages);
  const data = useAppSelector((state) => state.results.data);

  const isLoading = loading === "pending";
  const isIdle = loading === "idle";

  const visibleData = data.slice(0, page * pageSize);
  const hasData = visibleData.length > 0;

  const intObserver = useRef<HTMLDivElement | IntersectionObserver | null>(
    null
  );

  const lastPostRef = useCallback<(post: HTMLDivElement | null) => void>(
    (post) => {
      if (isLoading) {
        return;
      }
      if (intObserver.current) {
        (intObserver.current as IntersectionObserver).disconnect();
      }

      intObserver.current = new IntersectionObserver((results) => {
        if (results[0].isIntersecting && page < totalPages) {
          dispatch(incrementPage());
        }
      });

      if (post) {
        intObserver.current.observe(post);
      }
    },
    [isLoading, page, totalPages]
  );

  const content = visibleData.map((result, i) => {
    if (visibleData.length === i + 1) {
      return <ItunesResult ref={lastPostRef} key={uuidv4()} result={result} />;
    }
    return <ItunesResult key={uuidv4()} result={result} />;
  });

  if (!isIdle && !isLoading && visibleData.length === 0) {
    return <NoResults />;
  }

  return (
    <div className={hasData ? styles.wrapper : ""}>
      <div id="top" />
      {content}
      {isLoading && <Loader />}
      {hasData && <BackToTop id="top" />}
    </div>
  );
}
