import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Brain, 
  Globe, 
  BookOpen, 
  Target, 
  Users, 
  Award, 
  PenTool 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutSection = ({ title, description, icon: Icon }) => (
  <Card className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
    <div className="rounded-full bg-blue-500/10 p-3 mb-4">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </Card>
);

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Intelligent tools that adapt to your unique learning style and pace."
    },
    {
      icon: Globe,
      title: "Comprehensive Resources",
      description: "Access a wide range of educational tools and learning materials."
    },
    {
      icon: BookOpen,
      title: "Diverse Course Offerings",
      description: "From technical skills to creative pursuits, we've got you covered."
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Tailored recommendations and adaptive learning paths."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-indigo-800">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Revolutionizing Education with AI
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Empowering learners through innovative AI-driven educational tools that break 
            traditional learning barriers and unlock your full potential.
          </p>
          <Button 
            onClick={() => navigate('/features')}
            className="bg-blue-500 hover:bg-blue-400 text-white flex items-center gap-2 mx-auto"
          >
            Explore Our Tools <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-slate-600 text-center text-lg leading-relaxed">
              We believe in democratizing education through technology. Our platform 
              combines cutting-edge AI with comprehensive learning resources to create 
              personalized, accessible, and engaging educational experiences for 
              learners of all backgrounds and skill levels.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Our Core Educational Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AboutSection key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Technology Driving Educational Innovation
        </h2>
        <Card>
          <CardContent className="p-8">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Our platform leverages advanced artificial intelligence to create 
              adaptive learning experiences. From intelligent content summarization 
              to personalized course recommendations, we use machine learning 
              algorithms to understand and support your unique learning journey.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/features')}
              className="flex items-center gap-2 mx-auto text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              Discover Our Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Your Learning Journey Starts Here
            </h2>
            <p className="text-blue-100 mb-8">
              Transform your skills, expand your knowledge, and unlock new possibilities 
              with our AI-powered educational platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/courses')}
                className="border-white text-white hover:bg-blue-500"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;