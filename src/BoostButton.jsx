import React from 'react';

const BoostButton = () => {
    const handleBoost = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5050/property/boost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert('Failed to boost property: ' + data.message);
            }
        } catch (error) {
            console.error('Error boosting property:', error);
            alert('Error boosting property');
        }
    };

    return <button onClick={handleBoost}>Boost My Property</button>;
};

export default BoostButton;
