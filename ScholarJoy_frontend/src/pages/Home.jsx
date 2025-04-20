import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Brain, 
  Video,
  Languages,
  ArrowRight
} from 'lucide-react';
import img1 from '../assets/image3.png'

const features = [
  {
    icon: FileText,
    title: "PDF Summarizer",
    description: "Instantly extract key insights from complex documents and research papers."
  },
  {
    icon: Brain,
    title: "Mind Map Generator",
    description: "Transform complex concepts into visually intuitive learning diagrams."
  },
  {
    icon: Video,
    title: "YouTube Video Summarizer",
    description: "Get concise summaries of educational videos in minutes."
  },
  {
    icon: Languages,
    title: "Indian Sign Language Courses",
    description: "Inclusive learning modules for sign language communication."
  }
];

const benefits = [
  "AI-powered personalized learning tools",
  "Comprehensive educational resources",
  "Interactive and engaging learning experience",
  "Culturally sensitive content design",
  "Accessible across mobile and desktop platforms"
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#FF9933] to-[#0055A4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Empowering Learning through AI
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Transforming education with intelligent tools that make learning accessible, engaging, and personalized.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/about" className="rounded-md bg-white text-[#FF9933] px-6 py-3 text-sm font-semibold hover:bg-gray-100">
                Explore Tools
              </Link>
              <Link to="/about" className="text-sm font-semibold text-white flex items-center gap-2">
                View Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src={img1} 
              alt="AI Educational Platform" 
              className="rounded-xl shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Innovative Learning Solutions
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-[#FFE5B4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-[#FF9933]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community and Inclusivity Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Building an Inclusive Learning Ecosystem
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Our platform is designed to break barriers in education, making learning accessible to everyone, everywhere.
            </p>
            <div className="mt-10 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9933] text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span className="text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Connecting Learners Worldwide
              </h3>
              <p className="text-gray-600 mb-6">
                From personalized AI tools to interactive courses, we're revolutionizing how India learns.
              </p>
              <Link to="/about" className="bg-[#0055A4] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Your Learning Journey Starts Here
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Discover a world of knowledge tailored just for you, powered by cutting-edge AI technology.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/signup" className="rounded-md bg-white text-[#FF9933] px-8 py-3 font-semibold hover:bg-gray-100">
              Sign Up Free
            </Link>
            <Link to="/dem" className="rounded-md border border-white text-white px-8 py-3 font-semibold hover:bg-white/10">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;