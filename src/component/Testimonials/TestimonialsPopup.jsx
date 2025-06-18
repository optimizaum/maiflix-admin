import React from 'react';

const TestimonialsPopup = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">Testimonial Details</h2>
                <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}y</p>
                <p><strong>Description:</strong> {data.description}</p>
                  <div className="mt-4 flex justify-between">
                <button
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    onClick={() => handleStatusChange(selectedMemberId, "Approved")}
                >
                    Approve
                </button>
                <button
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    onClick={() => handleStatusChange(selectedMemberId, "Rejected")}
                >
                    Reject
                </button>

            </div>
            </div>
            
        </div>
    );
};

export default TestimonialsPopup;
