import React from "react";
import Navbar from "@/components/layout/Navbar";

const AdminDashboardLayout = ({ children }) => {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="container mx-auto px-6 pt-8 max-w-7xl pb-12">
				{children}
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
