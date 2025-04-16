import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth';
//import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';

function EmailSignin() {
    const [email, setEmail] = useState('');

    const sendEmailLink = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        try {
            const authInstance = getAuth(); // Ensure auth instance is correct
            const actionCodeSettings = {
                url: 'http://localhost:5173/login', // Update with production URL
                handleCodeInApp: true,
            };

            await sendSignInLinkToEmail(authInstance, email, actionCodeSettings);
            toast.success("Email sign-in link sent! Check your inbox.");
            localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            console.error("Error sending email link:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('public/final login.jpg')",
            }}>
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl font-bold mb-4'>Sign in with Email Link</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none'
                    placeholder='Enter your email'
                />
                <button
                    onClick={sendEmailLink}
                    className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                    Send Sign-in Link
                </button>
                <h2 className='text-white text-center mt-3'>
                    Back to <Link className='text-yellow-500 font-bold' to={'/login'}>Login</Link>
                </h2>
            </div>
        </div>
    );
}

export default EmailSignin;
