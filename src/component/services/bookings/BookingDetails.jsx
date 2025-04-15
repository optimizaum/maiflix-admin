import React from 'react'

const BookingDetails = () => {
    const handleBack = () => {
        window.history.back();
    }
    return (
        <>
            <div className='p-6 h-screen'>
                <div className='pb-5 flex'>
                    <h2 className='text-xl font-bold'>Booking Details
                    </h2>
                    <button onClick={handleBack} className='px-6 ml-auto py-2 cursor-pointer rounded-lg text-white bg-[#ce621a]'>Back</button>
                </div>
                <div className='rounded-lg bg-white shadow-lg border border-gray-300'>
                    <div className='grid grid-cols-2  gap-6 p-4'>

                        <h3 className=' font-bold'>Name</h3>
                        <p className='text-gray-600'>Amit</p>
                        <h3 className=' font-bold'>Email</h3>
                        <p className='text-gray-600'>amit@example.com</p>
                        <h3 className=' font-bold'>Phone</h3>
                        <p className='text-gray-600'>9999999999</p>
                        <h3 className='font-bold'>City</h3>
                        <p className='text-gray-600'>Delhi</p>
                        <h3 className=' font-bold'>Booking Date</h3>
                        <p className='text-gray-600'>12-05-2022</p>
                        <h3 className=' font-bold'>Booking Time</h3>
                        <p className='text-gray-600'>10:00 AM</p>
                        <h3 className=' font-bold'>Service</h3>
                        <p className='text-gray-600'>24hrs Live-In</p>

                        <h3 className=' font-bold'>Total Amount</h3>
                        <p className='text-gray-600'>Rs. 12000</p>
                        <h3 className=' font-bold'>Payment Method</h3>
                        <p className='text-gray-600'>Online</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingDetails