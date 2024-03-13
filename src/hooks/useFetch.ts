import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string, post: Object) {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        console.log('iauhsdiashuid')
        axios.post(url, post, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
          .then((res) => {
            console.log(res);
            setData(res.data);
          });
    }, [post, url]);

    return { data };
}