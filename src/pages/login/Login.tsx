import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEmailLoginMutation, useFacebookLoginMutation } from '../../redux/features/api/userApi/userApi';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import useTitle from '../../hooks/useTitle';

export default function Login() {
    useTitle("Login");
    const navigate = useNavigate();
    const location = useLocation();
    const [facebookLogin, { data: facebookLoginData, error: facebookLoginError, isLoading: facebookLoginIsLoading }] = useFacebookLoginMutation();
    const [emailLogin, { data: emailLoginData, error: emailLoginError, isLoading: emailLoginIsLoading }] = useEmailLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const responseCallback = (response: any) => {
        if (response && response.picture && response.picture.data && response.picture.data.url) {
            facebookLogin({
                name: response.name || '',
                email: response.email || '',
                facebookId: response.id || '',
                role: 'user',
                registerWith: 'facebook',
                profilePicture: response.picture.data.url || '',
                accessToken: response.accessToken || '',
                expiresIn: response.expiresIn || 0,
                dataAccessExpirationTime: response.data_access_expiration_time || 0
            });
        } else {
            setErrorMessage("Facebook login request has cancelled!");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        emailLogin({ email, password })
    };

    console.log(emailLoginData?.data?.user?.role)

    useEffect(() => {
        if (facebookLoginData) {
            navigate('/', { replace: true });
        }

        if (emailLoginData?.data?.user?.role === 'user') {
            navigate('/', { replace: true });
        }

        if (emailLoginData?.data?.user?.role === 'admin') {
            navigate('/dashboard', { replace: true });
        }

        if (facebookLoginError) {
            if ("status" in facebookLoginError) {
                const errMsgJSONString = 'error' in facebookLoginError ? facebookLoginError.error : JSON.stringify(facebookLoginError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }

        if (emailLoginError) {
            if ("status" in emailLoginError) {
                const errMsgJSONString = 'error' in emailLoginError ? emailLoginError.error : JSON.stringify(emailLoginError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [facebookLoginData, facebookLoginError, emailLoginData, emailLoginError, navigate, location.state?.from?.pathname]);

    if (facebookLoginIsLoading || emailLoginIsLoading) {
        return <Loader />;
    }

    return (
        <div className='h-screen flex justify-center items-center bg-white'>
            <div className='w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg'>
                <h2 className='text-center text-2xl font-bold mb-6'>Login</h2>

                {/* Form for email/password login */}
                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
                    >
                        Login
                    </button>
                </form>

                <div className='flex items-center justify-center my-4'>
                    <hr className='flex-grow' />
                    <span className='px-4 text-gray-500'>or</span>
                    <hr className='flex-grow' />
                </div>

                {/* Facebook login button */}
                <FacebookLogin
                    appId='1647725192730981'
                    autoLoad={false}
                    fields="name,email,picture"
                    scope='email,public_profile,user_link,user_gender,user_birthday,user_hometown,user_location,user_posts,user_likes'
                    callback={responseCallback}
                    render={(renderProps: any) => (
                        <button
                            onClick={renderProps.onClick}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.987h-2.54v-2.737h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.095 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.872h2.773l-.444 2.737h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            Login with Facebook
                        </button>
                    )}
                />

                {errorMessage && <p className='text-red-500 text-center mt-4'>{errorMessage}</p>}

                {/* Don't have an account? Sign up link */}
                <div className='mt-4 text-center'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account?
                        <Link to="/signup" className='text-blue-600 hover:underline ml-1'>
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
