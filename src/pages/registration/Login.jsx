import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword, getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle email sign-in link
    useEffect(() => {
        const authInstance = getAuth();
        if (isSignInWithEmailLink(authInstance, window.location.href)) {
            let storedEmail = window.localStorage.getItem("emailForSignIn");

            if (!storedEmail) {
                storedEmail = prompt("Please enter your email to confirm sign-in:");
            }

            signInWithEmailLink(authInstance, storedEmail, window.location.href)
                .then((result) => {
                    console.log("User signed in successfully:", result.user);
                    window.localStorage.removeItem("emailForSignIn");
                    toast.success("Login successful!");
                    navigate('/dashboard'); // Redirect after login
                })
                .catch((error) => {
                    console.error("Error signing in:", error);
                    toast.error("Sign-in failed!");
                });
        }
    }, [navigate]);

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Login failed! Check credentials.");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('public/final login.jpg')",
            }}>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl font-bold mb-4'>Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none'
                    placeholder='Email'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-gray-600 mb-2 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none'
                    placeholder='Password'
                />
                {/* Forgot Password Link */}
                <div className="flex justify-between mb-3">
                    <Link to="/email-signin" className="text-yellow-500 text-sm hover:underline">
                       Sign in with Email Link
                    </Link>
                    <Link to="/forgot-password" className="text-yellow-500 text-sm hover:underline">
                       Forgot Password?
                    </Link>
                </div>
                <button
                    onClick={login}
                    className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                    Login
                </button>
                <h2 className='text-white text-center mt-3'>
                    Dont have an account? <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link>
                </h2>
            </div>
        </div>
    );
}

export default Login;
