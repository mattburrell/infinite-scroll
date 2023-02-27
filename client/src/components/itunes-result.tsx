import React from "react";
import styles from "./itunes-result.module.css";

interface ItunesResultProps {
  result: ItunesSearchResultItem;
}

const ItunesResult = React.forwardRef<HTMLDivElement, ItunesResultProps>(
  ({ result: post }, ref) => {
    const postBody = (
      <div
        className={`${styles.card} ${
          post.wrapperType === "track" ? styles.song : ""
        } ${post.wrapperType === "collection" ? styles.album : ""} ${
          post.wrapperType === "artist" ? styles.artist : ""
        }`}
        data-testid="card"
      >
        <h2>{post.artistName && post.artistName}</h2>
        <p>{post.trackName && `Track Name: ${post.trackName}`}</p>
        <p>{post.collectionName && `Album: ${post.collectionName}`}</p>
      </div>
    );

    const content = ref ? (
      <article className={styles.article} ref={ref}>
        {postBody}
      </article>
    ) : (
      <article className={styles.article}>{postBody}</article>
    );

    return content;
  }
);

export default ItunesResult;
