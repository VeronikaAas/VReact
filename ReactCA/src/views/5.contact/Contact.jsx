import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        subject: "",
        email: "",
        body: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters.";
        }

        if (formData.subject.trim().length < 3) {
            newErrors.subject = "Subject must be at least 3 characters.";
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.body.trim().length < 3) {
            newErrors.body = "Message must be at least 3 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log("Form submitted:", formData);
            setSubmitted(true);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-10">
            <Helmet>
                <title>Contact us</title>
            </Helmet>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
                {submitted ? (
                    <div className="bg-white p-6 rounded-md shadow-md text-black text-center">
                        <h1 className="text-2xl font-semibold text-green-600 flex justify-center"> 
                            <CheckCircleIcon className="h-8 w-8 text-green-800 mr-1" />Thanks for contacting us</h1>
                        <p className="mt-4 text-gray-700">It's always good to get things off your chest! We will get back to you shortly.</p>
        
                        <Link to="/">
                            <button className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
                                Back to the store
                            </button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="mt-4">
                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>

                        {/* Subject */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Message (Body) */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Message</label>
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded h-28"
                                required/>
                            {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                            disabled={Object.keys(errors).length > 0}>
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
