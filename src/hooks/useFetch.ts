'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string, post: Object) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    axios.post(url, post, {
      headers: {

      }
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [post, url]);

  return { data, isFetching };
}