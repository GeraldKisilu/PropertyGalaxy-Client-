import React, { useState } from 'react';

const Agent = () => {
    // State to manage form inputs
    const [licenseNumber, setLicenseNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [forSale, setForSale] = useState(0);
    const [sold, setSold] = useState(0);
    const [languages, setLanguages] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [listedProperties, setListedProperties] = useState(0);
    const [userId, setUserId] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const agentData = {
            license_number: licenseNumber,
            full_name: fullName,
            email: email,
            experience: experience,
            phone_number: phoneNumber,
            for_sale: forSale,
            sold: sold,
            languages: languages,
            agency_name: agencyName,
            listed_properties: listedProperties,
            user_id: userId,
        };

        try {
            const response = await fetch('http://127.0.0.1:5050/properties/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agentData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Property added successfully:', result);
                // Reset form or handle success message
            } else {
                console.error('Error adding property:', response.statusText);
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    };

    return (
        <div>
            <h2>Add Property Listing</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="For Sale"
                    value={forSale}
                    onChange={(e) => setForSale(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Sold"
                    value={sold}
                    onChange={(e) => setSold(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Agency Name"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Listed Properties"
                    value={listedProperties}
                    onChange={(e) => setListedProperties(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default Agent;
