import React, { useState } from 'react';
import { Global } from '../../helpers/Global';
import { Loader } from '../../helpers/Loader';

export const SaveSummary = ({ summaryData, titleData }) => {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState("Save Summary");

    const saveSummary = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(Global.url + "content/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token

                },
                body: JSON.stringify({
                    title: titleData,
                    content: summaryData,
                }),
            });

            console.log(response);

            const data = await response.json();

            if (data.status !== "success") {
                console.error(data.error);
                alert("The summary has not been saved correctly");
            }

            setSave("Saved Successfully");
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert("The summary has not been saved correctly");
            setLoading(false);
        }
    }

    return <button onClick={saveSummary}>{loading ? <Loader /> : save}</button>
}
