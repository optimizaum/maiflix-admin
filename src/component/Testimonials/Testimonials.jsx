import React, { useState ,useContext, useEffect} from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AddTestimonial from './AddTestimonials';
import TablePagination from "@mui/material/TablePagination";
import { MdDownloading } from "react-icons/md";
import UpdateTestimonial from './UpdateTestimonial'
import { MyContext } from '../../context/MyContext';
import axios from 'axios';

const Testimonials = () => {
     const { API_BASE_URL, alltestimonials, fetchTestimonials } = useContext(MyContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdate,setIsModalUpdate]=useState(false);
    const [sloteId,setSloteId]=useState(-1)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    useEffect(()=>{
        fetchTestimonials();
    },[])
console.log("allTestimonials",alltestimonials);
    const [testimonialData, setTestimonialData] = useState([
        {
            id: 1,
            name: 'Akash',
            image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg',
            description: 'It is my testimonial 1',
        },
        {
            id: 2,
            name: 'Riya',
            image: 'https://marketplace.canva.com/EAFUdYqHyx0/1/0/1280w/canva-green-modern-customer-testimonials-instagram-post-p8RrhQOeAmc.jpg',
            description: 'It is my testimonial 2',
        },
    ]);

    const addTestimonial = (newTestimonial) => {
        setTestimonialData([...testimonialData, newTestimonial]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
   const handleDelete=async(id)=>{
    try{
           const response=await axios.delete(`${API_BASE_URL}/testimonial/${id}`,{
            headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        fetchTestimonials();
           console.log(response);
    }catch(err){
        console.log(err)

    }
   }
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Testimonials</h1>
                <button
                    onClick={() =>{ setIsModalOpen(true)
                  
                    }}
                    className="bg-[#ce621a] px-4 py-2 rounded-lg text-white font-semibold"
                >
                    Add Testimonial
                </button>
            </div>

            {/* Testimonials Table */}
            <div className="shadow-md rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-300 text-center">
                        <tr className="border border-gray-300 text-center">
                            <th className="py-2 px-4 border border-gray-400 text-gray-600 tracking-wider">SR No</th>
                            <th className="py-2 px-6 text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Name</th>
                            <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Description</th>
                            <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Image</th>
                            <th className="py-2 px-6  text-sm border border-gray-400 font-bold text-gray-600 uppercase tracking-wider ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alltestimonials && alltestimonials
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((testimonial, index) => (
                                <tr key={testimonial._id}>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                                        {page * rowsPerPage + index + 1}
                                    </td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                                        {testimonial.name}
                                    </td>
                                    <td className="py-2 border border-gray-300 px-6 text-sm text-center">
                                        {testimonial.description}
                                    </td>
                                    <td className="py-2 flex justify-center border border-gray-300 px-6 text-sm font-semibold text-center">
                                        <img
                                            src={testimonial.image}
                                            alt="testimonial"
                                            className="w-12 h-12  object-cover text-center"
                                        />
                                    </td>
                                    <td className="py-2 px-6 border border-gray-300">
                                        <div className="flex justify-center space-x-4">
                                            <td className="py-2 px-4 flex space-x-3 justify-center">
                                                <button className="text-gray-700 hover:text-blue-700 cursor-pointer">
                                                    <FaEye />
                                                </button>
                                                <button onClick={()=>{
                                                     setIsModalUpdate(true)
                                                     setSloteId(testimonial._id)
                                                }} className="text-gray-700 hover:text-yellow-700 cursor-pointer">
                                                    <FaEdit />
                                                </button>
                                                 <button
                                                                            className="text-gray-700 hover:text-red-700 cursor-pointer"
                                                                            onClick={() => handleDelete(testimonial?._id)}
                                                                          >
                                                                            <FaTrash />{" "}
                                                                          </button>
                                            </td>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Cards View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {testimonialData.map((testimonial) => (
                    <div key={testimonial.id} className="border p-4 hover:bg-gray-100 rounded-lg shadow-lg text-center">
                        <img
                            src={testimonial.image}
                            alt="Testimonial"
                            className="w-20 h-20 border rounded-full mx-auto object-cover"
                        />
                        <h3 className="text-lg font-semibold mt-2">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.description}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="fixed bottom-0 w-full bg-gray-200 shadow-md flex justify-center">
                <TablePagination
                    component="div"
                    count={testimonialData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AddTestimonial closeModal={() => setIsModalOpen(false)} addTestimonial={addTestimonial} />
            )}
             {isModalUpdate && (
                <UpdateTestimonial closeModal={() => setIsModalUpdate(false)} id={sloteId}/>
            )}
        </div>
    );
};

export default Testimonials;
