import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/login', values);
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
                navigate('/courses');
            }

        } catch (err) {
            if (err && err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const validate = values => {
        const errors = {};
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
            email: '',
            password: '',
        },
        onSubmit: values => {
            handleSubmit(values);
        },
        validate,
    });

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="yasser@mail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? <div className="text-center text-red-300">{formik.errors.email}</div> : null}

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                    {error ? <div className="text-center text-red-300">{error}</div> : null}
                </form>
            </div>
        </div>
    );
};

export default Login;