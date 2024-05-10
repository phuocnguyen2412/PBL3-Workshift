import { useState } from "react";

export default function useFetch(baseUrl) {
    const [loading, setLoading] = useState(false);

    function getApi(url) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        return reject(errorData.message || "Server error");
                    }

                    return response.json();
                })
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((err) => {
                    setLoading(false);
                    throw err;
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
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        return reject(errorData.message || "Server error");
                    }

                    return response.json();
                })
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((err) => {
                    setLoading(false);
                    throw err;
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
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        return reject(errorData.message || "Server error");
                    }

                    return response.json();
                })
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((err) => {
                    setLoading(false);
                    throw err;
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
                .then(async (response) => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        return reject(errorData.message || "Server error");
                    }

                    return response.json();
                })
                .then((data) => {
                    if (!data) {
                        setLoading(false);
                        return reject(data);
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((err) => {
                    setLoading(false);
                    throw err;
                });
        });
    }
    return { getApi, postApi, loading, deleteApi, updateApi };
}
