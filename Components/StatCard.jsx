import React from "react";

const StatCard = ({title, stat}) => {
    return (
        <div className="stat-card">
            <h3>{title}:</h3>
            <h1>{stat}</h1>
        </div>
    )
}

export default StatCard;