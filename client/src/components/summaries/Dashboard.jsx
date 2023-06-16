import React, { useEffect, useState } from 'react';
import { getSummaries } from '../../helpers/GetSummaries';
import { Link } from 'react-router-dom'
import summarize from "../../assets/summarize.svg";

export const Dashboard = () => {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem("user");

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        setLoading(true);
        const userObj = JSON.parse(user);
        const userId = userObj.id;
        
        const data = await getSummaries("summaries", userId);

        setSummaries(data.summaries);
        setLoading(false);
    };

    const removeLineBreaks = (text) => {
        return text.replace(/(\r\n|\n|\r)/gm, '');
    };

    const truncateContent = (content) => {
        const maxCharacters = 100;
        const cleanedContent = removeLineBreaks(content);

        if (cleanedContent.length > maxCharacters) {
            return cleanedContent.slice(0, maxCharacters) + '...';
        }

        return cleanedContent;
    };

    return (
        <section>
            <div className='dashboard'>
                {summaries.map((summary) => (
                    <div className='card' key={summary._id}>
                        <Link to={summary._id}>
                            <div className='card_top'>
                                <img src={summarize} alt="add" />
                                <h3>{summary.title}</h3>
                            </div>
                            <div className='card_content'>
                                <p>{truncateContent(summary.content)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};
