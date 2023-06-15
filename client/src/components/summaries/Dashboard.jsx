import React, { useEffect, useState } from 'react';
import { getSummaries } from '../../helpers/GetSummaries';
import summarize from "../../assets/summarize.svg";

export const Dashboard = () => {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        setLoading(true);
        const summaries = await getSummaries();

        setSummaries(summaries);
        setLoading(false);
    };

    const removeLineBreaks = (text) => {
        return text.replace(/(\r\n|\n|\r)/gm, '');
    };

    const truncateContent = (content) => {
        const maxCharacters = 200;
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
                        <a href='#'>
                            <div className='card_top'>
                                <img src={summarize} alt="add" />
                                <h3>{summary.title}</h3>
                            </div>
                            <div className='card_content'>
                                <p>{truncateContent(summary.content)}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
