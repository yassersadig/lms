import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link } from "react-router-dom";
import Loading from './Loading';


const Signup = () => {
    const [apiErrors, setApiErrors] = useState([]);
    const navigate = useNavigate();
    const signIn = useSignIn();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/signup', values);
            if (signIn({
                auth: {
                    token: response.data.token,
                    tokenType: 'Bearer',
                },
                userState: {
                    name: response.data.name,
                    email: response.data.email
                }
            })) {
                navigate('/');
                setLoading(false);
            }

        } catch (err) {
            if (err && err instanceof AxiosError) {
                setApiErrors(err.response?.data);
            } else if (err instanceof Error) {
                setApiErrors([err.message]);
            }
            setLoading(false);
        }
    };

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            handleSubmit(values);
        },
        validate,
    });

    return (
        <div className="flex flex-col h-full items-center justify-center">
            {loading && <Loading loading={loading} />}
            <div className="w-full max-w-xs shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="text-center text-2xl mb-4">Sign Up</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Yasser Ali"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? <div className="text-center text-red-300">{formik.errors.name}</div> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="yasser@mail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? <div className="text-center text-red-300">{formik.errors.email}</div> : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? <div className="text-center text-red-300">{formik.errors.password}</div> : null}
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-[#001a23] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                    </div>
                    {apiErrors.map((error, index) => <div key={index} className="text-center text-red-300">{error}</div>)}
                </form>
                <div className="text-center mt-4">Already have an account? <Link to="/login" className="text-[#407899]">Login</Link></div>
            </div>
        </div>
    );
};

export default Signup;