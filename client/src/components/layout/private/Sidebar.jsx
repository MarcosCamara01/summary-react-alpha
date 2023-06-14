import React, { useEffect, useState } from 'react';
import add from "../../../assets/add.svg";
import sidebar from "../../../assets/sidebar.svg";
import user from "../../../assets/user.svg";
import premium from "../../../assets/premium.svg";
import settings from "../../../assets/settings.svg";
import { getSummaries } from '../../../helpers/GetSummaries';
import { useAuth } from '../../../hooks/useAuth';

export const Sidebar = () => {

    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        setLoading(true);
        const summaries = await getSummaries();

        setSummaries(summaries);
        setLoading(false);
    };

    return (
        <div className='nav-container'>
            <div className="sidebar_top">
                <a href="#" className='sidebar-link top-component'>
                    <img src={add} alt="add" />
                    <span>New Summary</span>
                </a>
                <button className='top-component'><img src={sidebar} alt="sidebar" /></button>
            </div>
            <nav>
                <h3>Summaries</h3>
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
            <div className="sidebar_bottom">
                <a href="#" className='sidebar-link bottom-component'>
                    <div className='left-bottom'>
                        <img src={user} alt="add" />
                        <span>Upgrade Plan</span>
                    </div>
                    <img src={premium} alt="premium" />
                </a>
                <a href="#" className='sidebar-link bottom-component'>
                    <div className="left-bottom">
                        <img src={user} alt="add" />
                        <span>{auth.name + " " + auth.surname}</span>
                    </div>
                    <img src={settings} alt="settings" />
                </a>
            </div>
        </div>
    )
}
