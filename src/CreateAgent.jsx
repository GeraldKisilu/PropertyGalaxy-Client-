// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateAgent = ({ applicationId }) => {
//     const [loading, setLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleCreateAgent = async () => {
//         setLoading(true);
//         setErrorMessage('');
//         setSuccessMessage('');

//         try {
//             const response = await axios.post(`http://127.0.0.1:5050/admin/applications/${applicationId}/payment`, null, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             if (response.data.message) {
//                 setSuccessMessage(response.data.message);
//             }
//         } catch (err) {
//             setErrorMessage('Failed to create agent. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleCreateAgent} disabled={loading}>
//                 {loading ? 'Creating Agent...' : 'Create Agent'}
//             </button>
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         </div>
//     );
// };

// export default CreateAgent;
