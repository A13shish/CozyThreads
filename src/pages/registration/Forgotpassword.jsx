import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent!");
        } catch (error) {
            console.log(error);
            toast.error("Error sending reset email");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('public/final login.jpg')",
            }}>
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl font-bold mb-4'>Forgot Password</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none'
                    placeholder='Enter your email'
                />
                <button
                    onClick={handleReset}
                    className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                    Reset Password
                </button>
                <h2 className='text-white text-center mt-3'>
                    Remembered? <Link className='text-yellow-500 font-bold' to={'/login'}>Login</Link>
                </h2>
            </div>
        </div>
    );
}

export default ForgotPassword;
