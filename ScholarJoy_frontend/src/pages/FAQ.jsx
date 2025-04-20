import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: "About Our Platform",
      questions: [
        {
          q: "What makes this AI educational platform unique?",
          a: "Our platform combines multiple AI-powered tools like PDF summarizer, mind map generator, and YouTube video summarizer to create a comprehensive, personalized learning experience. We focus on making learning more efficient, interactive, and accessible."
        },
        {
          q: "How do the AI tools work together?",
          a: "Our AI technologies are interconnected to provide a holistic learning experience. For example, our PDF summarizer can generate mind maps, which can then be used to create concise video summaries, creating a seamless learning workflow."
        },
        {
          q: "Are the tools suitable for all education levels?",
          a: "Yes! Our platform is designed to support learners from school students to professionals. Each tool can be customized to match different complexity levels and learning objectives."
        }
      ]
    },
    {
      category: "Learning Tools",
      questions: [
        {
          q: "What is the PDF Summarizer?",
          a: "Our PDF Summarizer uses advanced natural language processing to extract key information from documents, creating concise and readable summaries. It helps students and professionals quickly understand complex documents."
        },
        {
          q: "How does the Mind Map Generator work?",
          a: "The Mind Map Generator analyzes text content and creates visual representations of key concepts, relationships, and hierarchies. This helps learners understand complex topics more intuitively."
        },
        {
          q: "Can I use the YouTube Video Summarizer for any video?",
          a: "Our YouTube Video Summarizer works best with educational content. It generates accurate summaries, key takeaways, and can even create timestamped notes for easy reference."
        }
      ]
    },
    {
      category: "Technical Details",
      questions: [
        {
          q: "What technologies power these tools?",
          a: "We use state-of-the-art AI technologies including natural language processing, machine learning, and deep learning algorithms. These technologies enable accurate content analysis, summarization, and visualization."
        },
        {
          q: "How accurate are the AI-generated summaries?",
          a: "Our AI models are continuously trained and refined. While accuracy is high, we recommend users review summaries and use them as aids rather than complete replacements for careful reading."
        },
        {
          q: "Are these tools available offline?",
          a: "Most of our tools require an internet connection to leverage cloud-based AI processing. However, we're working on offline capabilities for future versions."
        }
      ]
    },
    {
      category: "Accessibility & Support",
      questions: [
        {
          q: "Is the platform accessible on multiple devices?",
          a: "Yes, our platform is fully responsive and works on desktops, tablets, and mobile devices. We ensure a consistent user experience across different screen sizes."
        },
        {
          q: "What kind of support is available?",
          a: "We offer multiple support channels including email support, live chat, and comprehensive documentation. Our support team is committed to helping users get the most out of our platform."
        },
        {
          q: "Do you offer any free trials?",
          a: "We provide a free tier with limited access to our tools, allowing users to experience the platform's capabilities. Premium features are available through subscription plans."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Learn more about our AI-powered educational tools
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        {filteredFAQs.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((qa, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left">
                      {qa.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {qa.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Still Need Help Section */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <Card className="bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is ready to help you navigate our AI educational tools.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/features')}
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Explore Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;