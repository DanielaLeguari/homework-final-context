import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AddressContext } from "../../context/AddressContext";

import styles from "./AddressPagination.module.css";

export const AddressPagination = () => {
  const { totalPages, getAddress } = useContext(AddressContext);
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
    getAddress(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      {pages.map((item) => (
        <Link className={styles.link} key={item} to={`/address?page=${item}`}>{item}</Link>
      ))}
    </div>
  )
}