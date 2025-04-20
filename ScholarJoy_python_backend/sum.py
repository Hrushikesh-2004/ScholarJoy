import streamlit as st
import PyPDF2
import os
import requests
from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs

# Groq API Configuration
GROQ_API_KEY = "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"  # Load API key from environment variable
GROQ_MODEL = "llama3-8b-8192"  # Groq's LLaMA3 model

# Streamlit page setup
st.set_page_config(page_title="AI Text Summarizer", page_icon="📝", layout="wide")

st.markdown("### Upload text, YouTube URLs, or PDF files to get AI-powered summaries")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = "".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
    return text.strip()

# Function to get video ID from URL
def get_video_id(youtube_url):
    parsed_url = urlparse(youtube_url)
    if parsed_url.netloc == 'youtu.be':
        return parsed_url.path[1:]
    if parsed_url.netloc in ('www.youtube.com', 'youtube.com'):
        if parsed_url.path == '/watch':
            return parse_qs(parsed_url.query)['v'][0]
        if parsed_url.path.startswith('/embed/'):
            return parsed_url.path.split('/')[2]
        if parsed_url.path.startswith('/v/'):
            return parsed_url.path.split('/')[2]
    raise ValueError(f"Could not extract video ID from URL: {youtube_url}")

# Function to get YouTube transcript
def get_youtube_transcript(youtube_url):
    try:
        video_id = get_video_id(youtube_url)
        transcript_data = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        return " ".join([entry['text'] for entry in transcript_data])
    except Exception as e:
        return f"Error: {str(e)}"

# Function to summarize text using Groq API
def summarize_text_with_groq(text):
    if not GROQ_API_KEY:
        return "Error: Groq API key is missing. Set it using the environment variable GROQ_API_KEY."

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "Summarize the following text in a concise and informative manner:"},
            {"role": "user", "content": text}
        ]
    }
    
    try:
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
        response_data = response.json()
        
        if response.status_code == 200:
            return response_data['choices'][0]['message']['content']
        else:
            return f"Error {response.status_code}: {response_data}"
    except requests.exceptions.RequestException as e:
        return f"API connection error: {str(e)}"

# Create tabs for input types
tab1, tab2, tab3 = st.tabs(["Text Input", "YouTube URL", "PDF Upload"])

# Tab 1: Text Input
with tab1:
    st.header("Text Input")
    text_input = st.text_area("Enter text to summarize:", height=300)
    
    if st.button("Summarize Text", key="btn_text"):
        if text_input.strip():
            with st.spinner("Generating summary..."):
                summary = summarize_text_with_groq(text_input)
                st.subheader("Summary")
                st.write(summary)
        else:
            st.error("Please enter some text to summarize")

# Tab 2: YouTube URL
with tab2:
    st.header("YouTube URL")
    youtube_url = st.text_input("Enter YouTube video URL:")
    
    if st.button("Summarize YouTube Video", key="btn_youtube"):
        if youtube_url.strip():
            with st.spinner("Extracting transcript and generating summary..."):
                transcript = get_youtube_transcript(youtube_url)
                if transcript.startswith("Error"):
                    st.error(transcript)
                else:
                    with st.expander("Show transcript preview"):
                        st.text(transcript[:500] + "..." if len(transcript) > 500 else transcript)
                    summary = summarize_text_with_groq(transcript)
                    st.subheader("Summary")
                    st.write(summary)
        else:
            st.error("Please enter a YouTube URL")

# Tab 3: PDF Upload
with tab3:
    st.header("PDF Upload")
    uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
    
    if uploaded_file is not None:
        if st.button("Summarize PDF", key="btn_pdf"):
            with st.spinner("Extracting text and generating summary..."):
                pdf_text = extract_text_from_pdf(uploaded_file)
                with st.expander("Show PDF content preview"):
                    st.text(pdf_text[:500] + "..." if len(pdf_text) > 500 else pdf_text)
                
                # print("Extracted text: ", pdf_text)
                summary = summarize_text_with_groq(pdf_text)
                st.subheader("Summary")
                st.write(summary)