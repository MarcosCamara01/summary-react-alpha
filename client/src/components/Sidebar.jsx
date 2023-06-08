import React, { useEffect, useState } from 'react';
import { Global } from '../helpers/Global';

export const Sidebar = () => {

    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSummaries();
    }, []);

    const getSummaries = async () => {
        setLoading(true);
        try {
            const response = await fetch(Global.url + "summaries", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            console.log(data)

            if (data.status !== "success") {
                console.error(data.error);
                alert("Summaries could not be obtained");
            }
            setLoading(false);
            setSummaries(data.summaries)
        } catch (error) {
            console.error(error);
            alert("Summaries could not be obtained");
            setLoading(false);
        }
    }

    return (
        <div className='nav-container'>
            <nav>
                <ul>
                    {
                        summaries.map((summary) => (
                            <li key={summary._id}>
                                <a href="#">
                                    <div className='summary-title'>{summary.title}</div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}
