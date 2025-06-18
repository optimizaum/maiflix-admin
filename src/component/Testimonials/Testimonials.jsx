import React, { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import TablePagination from "@mui/material/TablePagination";

const Testimonials = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalUpdate, setIsModalUpdate] = useState(false);
//   const [sloteId, setSloteId] = useState(-1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const testimonialData = [
    {
      id: 1,
      name: 'Akash',
      description: 'It is my testimonial 1',
      image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg'
    },
    {
      id: 2,
      name: 'Riya',
      description: 'It is my testimonial 2',
      image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg'
    },
    {
      id: 3,
      name: 'Aman',
      description: 'It is my testimonial 3',
      image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg'
    },
    {
      id: 4,
      name: 'Neha',
      description: 'It is my testimonial 4',
      image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg'
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    alert(`Deleted testimonial with id: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Testimonials</h1>
        
      </div>

      <div className="shadow-md rounded-xl overflow-x-auto bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border border-gray-300">SR No</th>
              <th className="py-3 px-4 border border-gray-300">Name</th>
              <th className="py-3 px-4 border border-gray-300">Description</th>
              <th className="py-3 px-4 border border-gray-300">Image</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonialData.length > 0 ? (
              testimonialData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((testimonial, index) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {page * rowsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {testimonial.name}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {testimonial.description}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      <img
                        src={testimonial.image}
                        alt="testimonial"
                        className="w-12 h-12 rounded object-cover mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      <div className="flex justify-center gap-4 text-lg text-gray-700">
                        <button className="hover:text-blue-600" title="View">
                          <FaEye  className='cursor-pointer'/>
                        </button>
                       
                        <button
                          className="hover:text-red-600"
                          title="Delete"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          <FaTrash className='cursor-pointer' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Testimonials Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <TablePagination
          component="div"
          count={testimonialData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Testimonials;



// import React, { useState, useContext, useEffect } from 'react';
// import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// // import AddTestimonial from './AddTestimonials';
// import TablePagination from "@mui/material/TablePagination";

// import { MyContext } from '../../context/MyContext';
// import axios from 'axios';

// const Testimonials = () => {
//     const { API_BASE_URL, alltestimonials, fetchTestimonials } = useContext(MyContext);
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isModalUpdate, setIsModalUpdate] = useState(false);
//     const [sloteId, setSloteId] = useState(-1)
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(3);

//     useEffect(() => {
//         fetchTestimonials();
//     }, [])
//     console.log("allTestimonials", alltestimonials);
//     const [testimonialData, setTestimonialData] = useState([
//         {
//             id: 1,
//             name: 'Akash',
//             image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg',
//             description: 'It is my testimonial 1',
//         },
//         {
//             id: 2,
//             name: 'Riya',
//             image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg',
//             description: 'It is my testimonial 2',
//         },
//     ]);

//     const addTestimonial = (newTestimonial) => {
//         setTestimonialData([...testimonialData, newTestimonial]);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`${API_BASE_URL}/testimonial/${id}`, {
//                 headers: { Authorization: `${localStorage.getItem("token")}` },
//             })
//             fetchTestimonials();
//             console.log(response);
//         } catch (err) {
//             console.log(err)

//         }
//     }
//     return (
//         <div className="container mx-auto p-4">
//             <div className="flex flex-wrap items-center justify-between mb-4">
//                 <h1 className="text-xl font-bold">Testimonials</h1>

//                 <button
//                     onClick={() => { setIsModalOpen(true) }}
//                     className="bg-[#ce621a] px-4 py-2 rounded-lg text-white font-semibold">
//                     Add Testimonial
//                 </button>

//             </div>

//             {/* Testimonials Table */}
//             <div className="shadow-md rounded-xl overflow-hidden">
//                 <table className="w-full border-collapse">
//                     <thead className="bg-gray-300 text-center">
//                         <tr className="border border-gray-300 text-center">
//                             <th className="py-2 px-4 border border-gray-400 text-gray-600 tracking-wider">SR No</th>
//                             <th className="py-2 px-6 text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Name</th>
//                             <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Description</th>
//                             <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Image</th>
//                             <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {alltestimonials && alltestimonials
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((testimonial, index) => (
//                                 <tr key={testimonial._id}>
//                                     <td className="py-2 border border-gray-300 px-6 text-sm text-center">
//                                         {page * rowsPerPage + index + 1}
//                                     </td>
//                                     <td className="py-2 border border-gray-300 px-6 text-sm text-center">
//                                         {testimonial.name}
//                                     </td>
//                                     <td className="py-2 border border-gray-300 px-6 text-sm text-center">
//                                         {testimonial.description}
//                                     </td>
//                                     <td className="py-2 flex justify-center border border-gray-300 px-6 text-sm font-semibold text-center">
//                                         <img
//                                             src={testimonial.image}
//                                             alt="testimonial"
//                                             className="w-12 h-12  object-cover text-center"
//                                         />
//                                     </td>
//                                     <td className="py-2 px-6 border border-gray-300">
//                                         <div className="flex justify-center space-x-4">
//                                             <td className="py-2 px-4 flex space-x-3 justify-center">
//                                                 <button className="text-gray-700 hover:text-blue-700 cursor-pointer">
//                                                     <FaEye />
//                                                 </button>
//                                                 <button onClick={() => {
//                                                     setIsModalUpdate(true)
//                                                     setSloteId(testimonial._id)
//                                                 }} className="text-gray-700 hover:text-yellow-700 cursor-pointer">
//                                                     <FaEdit />
//                                                 </button>
//                                                 <button
//                                                     className="text-gray-700 hover:text-red-700 cursor-pointer"
//                                                     onClick={() => handleDelete(testimonial?._id)}
//                                                 >
//                                                     <FaTrash />{" "}
//                                                 </button>
//                                             </td>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>


//             {/* Pagination */}
//             <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center">
//                 <TablePagination
//                     component="div"
//                     count={testimonialData.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </div>


//         </div>
//     );
// };

// export default Testimonials;
