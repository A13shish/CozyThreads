// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div>
            <section className=''>
                <div className="container mx-auto px-5 py-10">
                    <h1 className='text-center text-3xl font-bold' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Testimonials
                    </h1>
                    <h2 className='text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        What our <span className='text-pink-500'>customers</span> are saying
                    </h2>
                    <div className="flex flex-wrap -m-4">

                        {/* Customer 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" 
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                                    src="https://randomuser.me/api/portraits/women/42.jpg" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "Absolutely love the collection from CozyThreads! The fabric is so soft, and the fit is just perfect.  
                                    Already placed my second order!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Riya Sharma
                                </h2>
                                <p className="text-gray-500">Verified Buyer</p>
                            </div>
                        </div>

                        {/* Customer 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" 
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                                    src="https://randomuser.me/api/portraits/men/44.jpg" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "Fast shipping, great fabric, and stylish designs! CozyThreads never disappoints. My recent t-shirt purchase was exactly as shown on the website!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Aman Verma
                                </h2>
                                <p className="text-gray-500">Fashion Enthusiast</p>
                            </div>
                        </div>

                        {/* Customer 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" 
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" 
                                    src="https://randomuser.me/api/portraits/women/48.jpg" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "Ordered a summer dress and it was exactly like the pictures! Super comfortable and stylish.  
                                    CozyThreads has become my favorite store for online shopping."
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Priya Desai
                                </h2>
                                <p className="text-gray-500">Happy Customer</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial;
