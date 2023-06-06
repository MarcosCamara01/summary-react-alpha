import React, { useState } from 'react';
import { Global } from '../helpers/Global';
import { Loader } from '../helpers/Loader';

export const SaveSummary = ({ summary }) => {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState("Save Summary");

    const saveSummary = async () => {
        console.log(summary);

        try {
            const response = await fetch(Global.url + "crear", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(summary),
            });

            console.log(response);

            const data = await response.json();

            if (data.status !== "success") {
                console.error(data.error);
                alert("The summary has not been saved correctly");
            }

            setSave("Saved successfully");
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert("The summary has not been saved correctly");
            setLoading(false);
        }
    }

    return <button onClick={saveSummary}>{loading ? <Loader /> : save}</button>
}
