import { useState } from "react";

export default function useFetch(baseUrl) {
    const [loading, setLoading] = useState(false);

    function getApi(url) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((error) => {
                    setLoading(false);
                    reject(error);
                });
        });
    }

    function postApi(url, body) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((error) => {
                    setLoading(false);
                    reject(error);
                });
        });
    }
    function updateApi(url, body) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((error) => {
                    setLoading(false);
                    reject(error);
                });
        });
    }
    function deleteApi(url, id) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url + `/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((error) => {
                    setLoading(false);
                    reject(error);
                });
        });
    }
    return { getApi, postApi, loading, deleteApi, updateApi };
}
