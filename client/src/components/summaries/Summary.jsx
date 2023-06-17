import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSummaries } from '../../helpers/GetSummaries';

export const Summary = () => {

    const params = useParams();
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        setLoading(true);
        
        const data = await getSummaries("summary", params.id);

        setSummary(data.summary);
        setLoading(false);
    };

  return (
    <section>
        <div>
            <h1>{summary.title}</h1>
            <p>{summary.content}</p>
        </div>
    </section>
  )
}
