import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export function useFetch(url, deps = [], options = {}) {
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("UNSENT");
  const { condition = true, debounce: wait } = options;

  const debouncedRequest = useCallback(
    debounce(url => {
      setStatus("LOADING");
      axios
        .get(url)
        .then(({ data }) => {
          setResponse(data);
          setStatus("DONE");
        })
        .catch(error => {
          if (!axios.isCancel(error)) {
            setStatus("ERROR");
          }
          throw error;
        });
    }, wait),
    [wait]
  );

  useEffect(() => {
    if (condition) {
      debouncedRequest(url);
    }
  }, deps);
  return [response, status];
}
