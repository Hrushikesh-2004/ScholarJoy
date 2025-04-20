import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Loader2, 
  BookOpen, 
  Brain, 
  Zap, 
  AlertTriangle 
} from "lucide-react";
import { motion } from "framer-motion";
import Flashcard from "./Flashcard";
import MindMap from "./MindMap";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LearnAI() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("flashcards");
  const [content, setContent] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [mindmap, setMindmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to explore.");
      return;
    }

    setLoading(true);
    setContent(null);
    setFlashcards([]);
    setMindmap(null);
    setError("");

    try {
      const response = await axios.post("http://localhost:9000/api/generate-content", { topic, type });
      const data = response.data.data || {};
      console.log(response.data.data);

      switch (type) {
        case "content":
          setContent(data.text || "No content available.");
          break;
        case "flashcards":
          setFlashcards(data.flashcards || []);
          break;
        case "mindmap":
          setMindmap(data.mindmap || "");
          break;
        default:
          setError("Invalid content type.");
      }
    } catch (error) {
      console.error("Content generation error:", error);
      setError("Failed to generate content. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic.length > 100) {
      setError("Topic must be less than 100 characters.");
    } else {
      setError("");
    }
  }, [topic]);

  const renderContent = () => {
    switch (type) {
      case "content":
        return content ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-600" />
              Generated Content on {topic}
            </h2>
            <p className="text-gray-700">{content}</p>
          </motion.div>
        ) : null;
      case "flashcards":
        return flashcards.length > 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="mr-2 text-green-600" />
              Flashcards on {topic}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcards.map((card, index) => (
                <Flashcard key={index} question={card.question} answer={card.answer} />
              ))}
            </div>
          </motion.div>
        ) : null;
      case "mindmap":
        return mindmap ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MindMap mindmap={mindmap} />
          </motion.div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Zap className="w-10 h-10 text-blue-600" />
          <CardTitle className="text-3xl font-bold text-blue-800">AI-Powered Learning Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex space-x-4">
              <Input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic (e.g., Quantum Computing)" className="flex-grow" />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {/* <option value="content">Text Content</option> */}
                <option value="flashcards">Flashcards</option>
                <option value="mindmap">Mind Map</option>
              </select>
              <Button onClick={handleGenerateContent}  className="px-6">
                {loading ? (<><Loader2 className="mr-2 animate-spin" /> Generating...</>) : "Generate"}
              </Button>
            </div>
            {error && (<div className="flex items-center text-red-500 space-x-2"><AlertTriangle className="w-5 h-5" /><p>{error}</p></div>)}
          </div>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}

export default LearnAI;
