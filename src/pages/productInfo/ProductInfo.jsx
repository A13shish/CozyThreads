// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';

function ProductInfo() {
    const context = useContext(myContext);
    const { setLoading } = context;

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const params = useParams();

    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productTemp = await getDoc(doc(fireDB, "products", params.id));
                const productData = productTemp.data();
                setProduct(productData);

                // ✅ Set default size and price (smallest size)
                if (productData.sizes && productData.sizes.length > 0) {
                    const defaultSize = productData.sizes[0];
                    setSelectedSize(defaultSize);
                    setSelectedPrice(defaultSize === "XXL" && productData.specialPriceXXL ? productData.specialPriceXXL : productData.price);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        getProductData();
    }, []);

    const dispatch = useDispatch();

    // ✅ Handle size selection
    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);

        // ✅ Use specialPriceXXL for XXL, otherwise use default price
        const newPrice = newSize === "XXL" && product.specialPriceXXL ? product.specialPriceXXL : product.price;
        setSelectedPrice(newPrice);
    };

    const addCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size before adding to cart');
            return;
        }
        dispatch(addToCart({ ...product, selectedSize, price: selectedPrice }));
        toast.success('Added to cart');
    };

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {product && (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded" src={product.imageUrl} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5">{product.description}</p>

                                {/* ✅ Size Selection Dropdown */}
                                <div className="flex items-center mb-4">
                                    <label className="mr-3 font-medium">Size:</label>
                                    <select className="border px-3 py-2 rounded" value={selectedSize} onChange={handleSizeChange}>
                                        {product.sizes?.map((size, index) => (
                                            <option key={index} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ✅ Display Selected Price */}
                                <div className="flex items-center">
                                    <span className="title-font font-medium text-2xl text-gray-900">₹{selectedPrice}</span>
                                </div>

                                {/* ✅ Add to Cart Button */}
                                <button onClick={addCart} className="flex mt-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
