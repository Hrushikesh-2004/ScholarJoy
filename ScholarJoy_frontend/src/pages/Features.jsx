import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import {
  FileText,
  Brain,
  Youtube,
  MessageCircle,
  BookOpen,
  HandMetal,
  Tv,
  FileVideo,
  Bot
} from 'lucide-react';

const mainFeatures = [
  {
    icon: BookOpen,
    title: "Specialized Courses",
    description: "Targeted learning for specific professional and personal contexts.",
  },
  {
    icon: FileText,
    title: "PDF Summarizer",
    description: "Intelligent tool to generate concise summaries of PDF documents.",
    link: "/sum"
  },
  {
    icon: Brain,
    title: "Mind Map Generator",
    description: "Create visual knowledge maps to enhance learning and comprehension.",
    link: "/mindmap"
  },
  {
    icon: Youtube,
    title: "YouTube Video Summarizer",
    description: "Quick and accurate summaries of educational YouTube videos.",
    link: "/sum"
  }
];

const additionalFeatures = [
  {
    icon: Bot,
    title: "Interview Preparation Bot",
    description: "AI-powered assistant for mock interviews and skill enhancement.",
    link: "/interview-bot"
  },
  {
    icon: MessageCircle,
    title: "Interactive Chat Rooms",
    description: "Real-time communication spaces powered by WebSocket technology.",
    link: "/chatroom"
  },
  {
    icon: FileVideo,
    title: "Chat with PDF",
    description: "Interact and extract insights directly from PDF documents.",
    link: "/chatpdf"
  },
  {
    icon: BookOpen,
    title: "AudioBook",
    description: "Get the audio version of the pdf you upload",
    link: "/audio"
  },
  {
    icon: ClipboardList,
    title: "Progress Tracker",
    description: "Track your learning progress and manage your course activities",
    link: "/progress"
  },
  {
    icon: HandMetal,
    title: "Indian Sign Language Animator",
    description: "provides basic animation of Indian Sign Language",
    link: "/learn"
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Empowering Education through AI Innovation
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100 max-w-3xl mx-auto">
            Transforming learning with cutting-edge AI tools designed for accessibility and efficiency
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">
            Flagship Features
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">
            {mainFeatures.map((feature, index) => (
              <Link to={feature.link} key={index} className="hover:scale-105 transition-transform">
                <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-lg">
                      <feature.icon className="h-7 w-7 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                      <p className="mt-2 text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">
            Additional Learning Tools
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {additionalFeatures.map((feature, index) => (
              <Link to={feature.link} key={index} className="hover:scale-105 transition-transform">
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md text-center">
                  <div className="w-16 h-16 bg-blue-500/10 flex items-center justify-center rounded-lg mb-4 mx-auto">
                    <feature.icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-10">
            Explore our AI-powered educational tools and transform the way you learn, communicate, and grow.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;