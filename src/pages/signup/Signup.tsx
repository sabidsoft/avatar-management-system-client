import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { useEmailSignupMutation } from '../../redux/features/api/userApi/userApi';
import Loader from '../../components/loader/Loader';

export default function Signup() {
    useTitle("Sign Up");
    const navigate = useNavigate();
    const [emailSignup, { isSuccess, error, isLoading }] = useEmailSignupMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [hometown, setHometown] = useState("");
    const [location, setLocation] = useState("");
    const [birthday, setBirthday] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword || !gender || !hometown || !location || !birthday) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        emailSignup({
            name,
            email,
            password,
            gender,
            hometown,
            location,
            birthday,
            role: 'user',
            registerWith: 'email'
        })
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }

        if (error) {
            if ("status" in error) {
                // get backend form validation error message
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                // set backend form validation error message
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [isSuccess, error, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='h-screen flex flex-col items-center bg-white mt-20 mx-5 md:mx-0'>
            <div className='w-full max-w-3xl bg-gray-100 p-8 rounded-lg shadow-lg'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <h2 className='text-center text-3xl font-bold mb-10'>Sign Up</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Name and Email */}
                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>

                        <div className='col-span-1'>
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

                        {/* Hometown and Location */}
                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='hometown'>Hometown</label>
                            <input
                                type='text'
                                id='hometown'
                                placeholder='Enter hometown'
                                value={hometown}
                                onChange={(e) => setHometown(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>

                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>Location (Current City)</label>
                            <input
                                type='text'
                                id='location'
                                placeholder='Enter current city'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>

                        {/* Gender and Birthday */}
                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='gender'>Gender</label>
                            <select
                                id='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='birthday'>Birthday</label>
                            <input
                                type='date'
                                id='birthday'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>

                        {/* Password and Confirm Password */}
                        <div className='col-span-1'>
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

                        <div className='col-span-1'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>
                    </div>

                    <div className='flex justify-center pt-4'>
                        <button
                            type='submit'
                            className='w-[50%] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {errorMessage && <p className='text-red-500 text-center mt-4'>{errorMessage}</p>}

                <div className='mt-4 text-center'>
                    <p className='text-sm text-gray-600'>
                        Already have an account?
                        <Link to="/login" className='text-blue-600 hover:underline ml-1'>
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
