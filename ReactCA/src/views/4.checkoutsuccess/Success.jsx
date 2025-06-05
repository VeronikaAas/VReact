import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Helmet } from 'react-helmet-async';

export default function CheckoutSuccessPage() {
	return (
		<div className="max-w-3xl mx-auto p-6 bg-sky-300 border border-sky-500 shadow-lg rounded-lg mt-10">
			<Helmet>
				<title>Checkout Success</title>
			</Helmet>
			<div className="bg-white p-6 rounded-md shadow-md text-black text-center">
				<h1 className="text-2xl font-semibold text-green-600 flex justify-center">
					<CheckCircleIcon className="h-8 w-8 text-green-800 mr-1" />
					Order Complete!
				</h1>
				<p className="mt-4 text-gray-700">Thank you for your order! We will ship it out shortly.</p>

				<Link to="/">
					<button
						aria-label="Back to the store"
						className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 cursor-pointer"
					>
						Back to the store
					</button>
				</Link>
			</div>
		</div>
	);
}
