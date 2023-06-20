import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSummaries } from '../../helpers/GetSummaries';
import { edit } from '../../helpers/Edit';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export const Summary = () => {
    const params = useParams();
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        setLoading(true);

        const data = await getSummaries('summary', params.id);

        setSummary(data.summary);
        setLoading(false);
    };

    const editSummary = async () => {
        try {
            setLoading(true);

            const data = await edit('summary', params.id, {
                title: updatedTitle,
            });

            setSummary(data.summary);
            setIsEditing(false);
            setLoading(false);
        } catch (error) {
            console.log('Error updating summary:', error);
            setLoading(false);
        }
    };

    const startEditing = () => {
        setIsEditing(true);
        setUpdatedTitle(summary.title);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setUpdatedTitle('');
    };

    const handleTitleChange = (e) => {
        setUpdatedTitle(e.target.value);
    };

    return (
        <section>
            <div className="summary">
                <h1>
                    {isEditing ? (
                        <div className='input-bx'>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={handleTitleChange}
                            />
                            <div className='buttons'>
                                <AiOutlineCheck onClick={editSummary} />
                                <AiOutlineClose onClick={cancelEditing} />
                            </div>
                        </div>
                    ) : (
                        <>
                            {summary.title}
                            <div className='buttons'>
                                <AiOutlineEdit onClick={startEditing} />
                            </div>
                        </>
                    )}
                </h1>
                <p>{summary.content}</p>
            </div>
        </section>
    );
};
