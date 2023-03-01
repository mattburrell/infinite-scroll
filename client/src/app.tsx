import { useState } from "react";
import { fetchData, reset } from "./store/slices/resultsSlice";
import { useAppDispatch } from "./hooks/redux";
import Scroller from "./components/scroller";
import styles from "./app.module.css";

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Uses button click rather than input onChange because itunes api is rate limited.
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!search) {
      return;
    }
    dispatch(reset());
    const term = encodeURIComponent(search).replace(/%20/g, "+");
    try {
      await dispatch(fetchData(term)).unwrap();
    } catch (rejectedValueOrSerializedError: any) {
      setError(rejectedValueOrSerializedError.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Enter search term"
          className={styles.input}
        />
        <button className={styles.button} onClick={handleButtonClick}>
          Search
        </button>
      </div>
      {error ? <p className={styles.error}>{error}</p> : <Scroller />}
    </div>
  );
};

export default App;
