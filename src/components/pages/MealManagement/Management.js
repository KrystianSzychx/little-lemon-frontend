import React, { useState } from 'react';
import './Management.css';
import AddMeal from './AddMeal';
import UpdateMeal from './UpdateMeal';

const Management = () => {
    const [activeTab, setActiveTab] = useState('add');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="management">
            <div className="tabs">
                <div 
                    className={`tab ${activeTab === 'add' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('add')}
                >
                    Add
                </div>
                <div 
                    className={`tab ${activeTab === 'update' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('update')}
                >
                    Update
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'add' && <AddMeal />}
                {activeTab === 'update' && <UpdateMeal />} {/* Use the same AddMeal component for updates */}
            </div>
        </div>
    );
};

export default Management;
