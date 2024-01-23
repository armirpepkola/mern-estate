import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-teal-500 text-white p-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">RS Marketplace</h2>
                    <p className="text-sm">Providing exceptional homes since 2020</p>
                </div>
            </div>
    
            <div className="mt-8 text-center text-sm">
                <p>&copy; 2024 RS Marketplace. All rights reserved.</p>
            </div>
        </footer>
      );
}