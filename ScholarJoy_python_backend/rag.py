import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.document_loaders import PyPDFLoader

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class PDFChatbot:
    def __init__(self):
        # Initialize embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )
        
        # Groq LLM 
        self.llm = ChatGroq(
            temperature=0.2,
            model_name="llama3-8b-8192",
            groq_api_key="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"
        )
        
        # Vectorstore and retrieval chain
        self.vectorstore = None
        self.retrieval_qa_chain = None

    def process_pdf(self, pdf_path):
        """Process PDF and create vector store"""
        # Load PDF
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()
        
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_documents(documents)
        
        # Create vector store
        self.vectorstore = FAISS.from_documents(texts, self.embeddings)
        
        # Create retrieval QA chain
        self.retrieval_qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 3}  # Return top 3 most relevant chunks
            ),
            return_source_documents=True
        )

    def answer_query(self, query):
        """Answer query using retrieval QA chain"""
        if not self.retrieval_qa_chain:
            raise ValueError("PDF not processed. Upload a PDF first.")
        
        # Run query
        result = self.retrieval_qa_chain({"query": query})
        
        # Extract source documents for context
        context = [
            {
                "page": doc.metadata.get("page", "N/A"),
                "text": doc.page_content[:200] + "..."
            } 
            for doc in result.get("source_documents", [])
        ]
        
        return {
            "answer": result["result"],
            "context": context
        }

# Flask Application
app = Flask(__name__)
CORS(app)
pdf_chatbot = PDFChatbot()

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    print("Received upload request")

    if 'file' not in request.files:
        print("No file part in request")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    print(f"Received file: {file.filename}")
    
    if file.filename == '':
        print("Filename is empty")
        return jsonify({'error': 'No selected file'}), 400
    
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    print(f"Saved file to: {file_path}")
    
    try:
        pdf_chatbot.process_pdf(file_path)
        print("Processed PDF successfully")
        return jsonify({'message': 'PDF uploaded successfully'})
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/chat-pdf', methods=['POST'])
def chat_with_pdf():
    data = request.json
    query = data.get('query', '')
    
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    try:
        # Generate answer
        response = pdf_chatbot.answer_query(query)
        return jsonify(response)
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'Error processing query'}), 500

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, port=9000, use_reloader=False)
