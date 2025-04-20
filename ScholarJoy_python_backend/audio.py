import streamlit as st
import PyPDF2
import tempfile
import os
import requests
from gtts import gTTS
import time

# === Configuration ===
OLLAMA_MODEL = "codellama"
GROQ_MODEL = "llama3-8b-8192"  # or "mixtral-8x7b-32768", etc.
GROQ_API_KEY = "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"  # Load from environment variable

# Hide Streamlit branding
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        header {visibility: hidden;}
        footer {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

# === PDF Text Extraction ===
def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text.strip()

# === Ollama Summarization ===
def summarize_text_ollama(text):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": OLLAMA_MODEL,
                "prompt": f"Summarize the following text concisely:\n\n{text}",
                "stream": False
            }
        )
        return response.json().get("response", "Error: No response from Ollama.")
    except Exception as e:
        return f"Ollama Error: {str(e)}"

# === Groq Summarization ===
def summarize_text_groq(text):
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": "You are a helpful summarization assistant."},
                    {"role": "user", "content": f"Summarize the following text concisely:\n\n{text}"}
                ],
                "temperature": 0.7
            }
        )
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Groq Error: {str(e)}"

# === Ollama Audiobook Narration ===
def audio_style_text_ollama(text):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": OLLAMA_MODEL,
                "prompt": (
                    "Convert this into engaging audiobook narration with a smooth, relatable tone:\n\n" + text
                ),
                "stream": False
            }
        )
        return response.json().get("response", "Error: No response from Ollama.")
    except Exception as e:
        return f"Ollama Audio Error: {str(e)}"

# === Groq Audiobook Narration ===
def audio_style_text_groq(text):
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": "You are a narrator converting summaries into immersive audiobooks."},
                    {"role": "user", "content": f"Convert the following into audiobook narration:\n\n{text}"}
                ],
                "temperature": 0.7
            }
        )
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Groq Audio Error: {str(e)}"

# === gTTS Text to Audio ===
def text_to_speech_gTTS(text, output_file):
    try:
        tts = gTTS(text)
        tts.save(output_file)
        time.sleep(1)
    except Exception as e:
        st.error(f"Text-to-Speech Error: {str(e)}")

# === Cleanup Temporary Audio ===
def clear_audio_memory():
    if 'temp_audio_file' in st.session_state:
        if os.path.exists(st.session_state['temp_audio_file']):
            os.remove(st.session_state['temp_audio_file'])
        del st.session_state['temp_audio_file']

# === Streamlit App UI ===
st.title("📘 PDF to Summarized Audiobook")
uploaded_file = st.file_uploader("Upload a PDF file", type="pdf")
model_choice = st.radio("Choose summarization engine:", ["Ollama (Local)", "Groq (Cloud)"])

if uploaded_file is not None and st.button("Summarize & Generate Audio"):
    with st.spinner("Extracting and processing..."):
        full_text = extract_text_from_pdf(uploaded_file)
        if not full_text:
            st.error("No readable text found in the PDF.")
            st.stop()

        # Choose summarizer
        if model_choice == "Ollama (Local)":
            summary = summarize_text_ollama(full_text)
            audio_text = audio_style_text_ollama(summary)
        else:
            summary = summarize_text_groq(full_text)
            audio_text = audio_style_text_groq(summary)

        st.subheader("Extracted Text (Preview)")
        st.text(full_text[:500] + "..." if len(full_text) > 500 else full_text)
        st.subheader("📄 Summary")
        st.text(summary)

        # Save audio
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        temp_file.close()
        st.session_state['temp_audio_file'] = temp_file.name
        text_to_speech_gTTS(audio_text, temp_file.name)

        if os.path.exists(temp_file.name):
            st.subheader("🔊 Audio Summary")
            st.audio(temp_file.name, format="audio/mp3")
        else:
            st.error("Audio generation failed.")

# Cleanup
clear_audio_memory()
