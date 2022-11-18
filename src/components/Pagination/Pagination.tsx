import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PersonContext } from "../../context/PersonContext";
import styles from "./Pagination.module.css";

export const Pagination = () => {
  const { totalPages, getPerson } = useContext(PersonContext);
  const [searchParam] = useSearchParams();
  const pageNumber = (searchParam.get("page") || "1");

  const pages = useMemo(() => {
    const pageList: number[] = [];

    for(let i = 1; i <= totalPages; i++) {
      pageList.push(i)
    }
    return pageList;
  }, [totalPages]);

  useEffect(() => {
    getPerson(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      {pages.map((item) => (
        <Link className={styles.link} key={item} to={`/dashboard?page=${item}`}>{item}</Link>
      ))}
    </div>
  )
}