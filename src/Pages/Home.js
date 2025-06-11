import React from 'react';

import {  FileText, Bot, Award, Clock, Users, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Main App component
export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans antialiased">

            <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-10 blur-sm z-0"></div> 

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 animate-fade-in-up">
                        Master Your Next Interview with <span className="text-blue-400">AI-Powered Practice</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10 animate-fade-in-up delay-200">
                        Gain confidence and excel in your job search. Our platform provides realistic, AI-driven mock interviews tailored to your resume and desired role.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
                        <Link to='/sign_up' className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            Get Started - It's Free!
                        </Link>
                        <Link to='/sign_up' className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-gray-200 text-lg font-bold rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-black px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 border border-gray-700">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">1. Upload Details</h3>
                            <p className="text-gray-300">
                                Provide your resume and specify the job role you're preparing for. Our AI analyzes your background to create a personalized experience.
                            </p>
                        </div>
            
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 border border-gray-700">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">2. Interview with AI</h3>
                            <p className="text-gray-300">
                                Engage in a live mock interview with our intelligent AI interviewer. Answer questions just like in a real setting.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 border border-gray-700">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">3. Get Instant Feedback</h3>
                            <p className="text-gray-300">
                                Receive immediate, comprehensive feedback on your responses, communication, and areas for improvement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-black px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12">Why Choose Our AI Interviewer?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <CheckCircle2 className="w-7 h-7 text-green-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Personalized Experience</h3>
                                <p className="text-gray-300">
                                Interviews are dynamically generated based on your resume and target role, ensuring relevant practice.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <Lightbulb className="w-7 h-7 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Intelligent Feedback</h3>
                                <p className="text-gray-300">
                                Receive detailed analysis on your answers, tone, clarity, and non-verbal cues.
                                </p>
                            </div>
                        </div>

            
                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <Clock className="w-7 h-7 text-red-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Practice Anytime, Anywhere</h3>
                                <p className="text-gray-300">
                                Our platform is available 24/7, allowing you to practice at your convenience from any device.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <Users className="w-7 h-7 text-indigo-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Build Confidence</h3>
                                <p className="text-gray-300">
                                Repeated practice with AI helps reduce interview anxiety and boosts your self-assurance.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <Bot className="w-7 h-7 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Realistic Simulations</h3>
                                <p className="text-gray-300">
                                Experience interview scenarios that closely mimic real-world conditions, preparing you for anything.
                                </p>
                            </div>
                        </div>
    
                        <div className="flex items-start bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                            <Award className="w-7 h-7 text-orange-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Performance Tracking</h3>
                                <p className="text-gray-300">
                                Track your progress over time and see how your interview skills improve with each session.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 to-purple-800 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">Ready to Ace Your Next Interview?</h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-10">
                        Join thousands of candidates who are already transforming their interview preparation.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/sign_up" className="px-10 py-4 bg-white text-blue-700 text-lg font-bold rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        Sign Up Now
                        </Link>
                        <Link to='/log_in' className="px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        Login to Your Account
                        </Link>
                    </div>
                </div>
            </section>


            <footer className="py-8 bg-black text-center text-gray-400 text-sm">
                <div className="max-w-6xl mx-auto px-6">
                    <p>&copy; {new Date().getFullYear()} AI Interviewer. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="/" className="hover:text-blue-400 transition duration-300">Privacy Policy</a>
                        <a href="/" className="hover:text-blue-400 transition duration-300">Terms of Service</a>
                        <a href="/" className="hover:text-blue-400 transition duration-300">Support</a>
                    </div>
                </div>
            </footer>

        {/* Custom CSS for background pattern and animations */}
        <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
                body {
                font-family: 'Inter', sans-serif;
                }
                .animate-fade-in-up {
                animation: fadeInUp 1s ease-out forwards;
                opacity: 0;
                }
                .animate-fade-in-up.delay-200 {
                animation-delay: 0.2s;
                }
                .animate-fade-in-up.delay-400 {
                animation-delay: 0.4s;
                }
                @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }

                .bg-hero-pattern {
                background-image: radial-gradient(circle at center, rgba(147, 197, 253, 0.05) 1px, transparent 1px);
                background-size: 20px 20px;
                }
            `}
        </style>
    </div>
  );
}
