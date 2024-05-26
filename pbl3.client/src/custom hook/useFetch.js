import { useState } from "react";

export default function useFetch(baseUrl) {
    const token = JSON.stringify(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    function getApi(url) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
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

    function postApi(url, body = {}) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "post",
                headers: {
                    Authorization: `${token}`,
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
    function updateApi(url, body = {}) {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "PUT",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then(async (response) => {
                    console.log(response);
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
    function deleteApi(url, id = "") {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url + `${id}`, {
                method: "delete",
                headers: {
                    Authorization: `${token}`,
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
