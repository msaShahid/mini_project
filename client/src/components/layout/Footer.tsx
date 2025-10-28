import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <>
         <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-xl font-bold">ReactApp</span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            A modern React 19 application 
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to={'/'} className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
                            <li><Link to={'/about'} className="text-gray-400 hover:text-white transition-colors duration-200">About</Link></li>
                            <li><Link to={'/contact'} className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">© 2025 ReactApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </>
    )
}