// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Track() {
    const context = useContext(myContext);
    const { mode } = context;
    
    const items = [
        { title: "Premium T-Shirts", quote: "Style that speaks for itself.", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" },
        { title: "Trendy Hoodies", quote: "Comfort meets fashion.", icon: "M12 6.75V15m6-6.75V15M6 9.75V15m0 0a3 3 0 006 0m6 0a3 3 0 00-6 0" },
        { title: "Exclusive Sneakers", quote: "Walk in style, step with confidence.", icon: "M4.75 15l4.5 1.5 4.5-1.5M2.25 19.5h19.5M6 6l12 6M6 6v6m12-6v6" },
        { title: "Stylish Caps", quote: "Top off your look.", icon: "M12 4.5V6m-6 6v6m12-6v6M6 6l12 6M6 6v6m12-6v6" },
        { title: "Classic Jeans", quote: "Denim that never fades.", icon: "M4 6h16M4 6l4 14m8-14l4 14M4 20h16" },
        { title: "Wrist Watches", quote: "Timeless elegance on your wrist.", icon: "M12 4.5V6m-6 6v6m12-6v6M6 6l12 6M6 6v6m12-6v6" },
    ];

    return (
        <div>
            <section>
                <div className="container mx-auto px-5 md:py-5">
                    <div className="flex flex-wrap -m-4 text-center">
                        {items.map((item, index) => (
                            <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                <div className="border-2 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-gray-200 bg-gray-100 shadow-lg px-6 py-8 rounded-lg" 
                                     style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                    <svg className="text-pink-600 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                    <p className="leading-relaxed text-gray-600" style={{ color: mode === 'dark' ? 'lightgray' : '' }}>{item.quote}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Track;
