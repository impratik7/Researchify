from flask import Flask, jsonify
from openai import OpenAI
from google.cloud import texttospeech
import boto3
import arxiv
import together
import base64
from dotenv import load_dotenv
import os

# API keys
load_dotenv()
TOGETHER_API_KEY = os.environ.get("TOGETHER_API_KEY")
together.api_key = os.environ.get("TOGETHER_API_KEY")
GCP_KEY = os.environ.get("GCP_KEY")
AWS_ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")
AWS_REGION = os.environ.get("AWS_REGION")
AWS_S3_BUCKET_NAME = 'treehacksbucket'

# Initialize clients
client = arxiv.Client()

llm_client = OpenAI(api_key=TOGETHER_API_KEY,
  base_url='https://api.together.xyz',
)

s3_client = boto3.client(
        service_name='s3',
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY
    )

# Functions
def search_paper(query):
    if query is None:
        search_query = 'Most recent and trending papers in Machine leanring, Artificial intelligence, Biology and quantum computing.'
    else:
        search_query = query
    print(search_query)
    search = arxiv.Search(
    query = search_query,
    max_results = 2,
    # sort_by = arxiv.SortCriterion.SubmittedDate
    )

    results = client.results(search)

    id_list = []

    data = []

    for r in results:
        print(str(r.title) + '\n')
        id = str(r).split('/')[-1]
        id_list.append(id)
        intro = str(r.summary)
        summary = get_summary(intro, id)
        print('Summarization done' + '\n')

        MP3_LINK =  text_to_speech(summary, id)
        print('Text 2 speech and upload done' + '\n')

        input_prompt = get_image_prompt(intro, id)
        print('Image promt generation done' + '\n')

        IMG_LINK = llm_image(input_prompt, id)
        print('Image from promt done' + '\n')

        download_paper(id_list)
        print('Paper upload done' + '\n')


        article_data = {
            'title': r.title,
            'intro': intro,
            'author': str(r.authors[0]),
            'date': r.published,
            'pdf_link': r.pdf_url,
            'summary': summary,
            'pdf_url': r.pdf_url,
            'image_url': IMG_LINK,
            'mp3_url': MP3_LINK
        }
        data.append(article_data)
    
    return jsonify(data)


def download_paper(id_list):
    for id in id_list:
        paper = next(arxiv.Client().results(arxiv.Search(id_list=[id])))
        paper.download_pdf(filename=id + '.pdf')
        
        LOCAL_FILE = id + ".pdf"
        NAME_FOR_S3 = f"pdf/{id}/{LOCAL_FILE}"
        PDF_LINK = 'https://' + AWS_S3_BUCKET_NAME + '.s3.' + AWS_REGION + '.amazonaws.com/' + NAME_FOR_S3
        
        s3_client.upload_file(LOCAL_FILE, AWS_S3_BUCKET_NAME, NAME_FOR_S3)
        
        return  PDF_LINK


def get_summary(intro, id):
    chat_completion = llm_client.chat.completions.create(
    messages=[
        {
        "role": "system",
        "content": "You are an AI assistant. You have to author an interesting conversartional podcast the introduction of this reseach paper.",
        },
        {
        "role": "user",
        "content":f"""This is the summary of a research paper:\n {intro}\n\n
        Generate an interesting conversational podcast introduction based on the provided research paper introduction. Assume that you are an AI assistant hosting a podcast about the topic of the research paper. Begin by providing some background knowledge about the topic to engage the listeners. Make the podcast fun and interesting to listen to, incorporating elements of storytelling and conversational tone. The introduction should seamlessly transition from the background information to summarizing the research paper's introduction in an engaging and informative manner. Aim for a total podcast length of around 2000 words. Remember to maintain a conversational style throughout the podcast, keeping the audience entertained and eager to learn more about the topic.
        """}
    ],
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    max_tokens=2500
    )
    return chat_completion.choices[0].message.content.strip()

def get_image_prompt(intro, id):
    image_prompt = llm_client.chat.completions.create(
    messages=[
        {
        "role": "system",
        "content": "You are an AI assistant. You have to author an interesting prompt for text to image application.",
        },
        {
        "role": "user",
        "content":f"""This is the summary of a research paper:\n {intro}\n\n
Generate a good prompt which is fed to LLM for text to image conversion. It should be descriptive but short so image is representative of the main concept of the intro provided.        """}
    ],
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    max_tokens=1000
    )
    return image_prompt.choices[0].message.content.strip()


def llm_image(input_prompt, id):
    # generate image 
    response = together.Image.create(prompt=input_prompt, model="SG161222/Realistic_Vision_V3.0_VAE")

    # save the first image
    image = response["output"]["choices"][0]
    with open(id+".png", "wb") as f:
        f.write(base64.b64decode(image["image_base64"]))
    
    LOCAL_FILE = id + ".png"
    NAME_FOR_S3 = f"image/{id}/{LOCAL_FILE}"
    IMG_LINK = 'https://' + AWS_S3_BUCKET_NAME + '.s3.' + AWS_REGION + '.amazonaws.com/' + NAME_FOR_S3

    s3_client.upload_file(LOCAL_FILE, AWS_S3_BUCKET_NAME, NAME_FOR_S3)

    return IMG_LINK


def text_to_speech(text, id):
    output_filename = id + '.mp3'
    text_to_speech_client = texttospeech.TextToSpeechClient.from_service_account_json('demotexttospeech-414610-5757a571c8a7.json')
    # Set text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # voice request, language code ("en-US") and voice gender ("neutral")
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-GB",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE)

    # type of audio file returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3)

    # text-to-speech request
    response = text_to_speech_client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

    # response's audio_content is binary
    with open(output_filename, "wb") as out:
        out.write(response.audio_content)
    
    LOCAL_FILE = id + ".mp3"
    NAME_FOR_S3 = f"mp3/{id}/{LOCAL_FILE}"
    MP3_LINK = 'https://' + AWS_S3_BUCKET_NAME + '.s3.' + AWS_REGION + '.amazonaws.com/' + NAME_FOR_S3

    s3_client.upload_file(LOCAL_FILE, AWS_S3_BUCKET_NAME, NAME_FOR_S3)

    return MP3_LINK

app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/query/<input>')
def hello(input):
    result = search_paper(input)
    return result

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000)
        
# search_paper('love')

# llm_image()
        
# text = """Collectively, machine learning (ML) researchers are engaged in the creation
# and dissemination of knowledge about data-driven algorithms. In a given paper,
# researchers might aspire to any subset of the following goals, among others: to
# theoretically characterize what is learnable, to obtain understanding through
# empirically rigorous experiments, or to build a working system that has high
# predictive accuracy. While determining which knowledge warrants inquiry may be
# subjective, once the topic is fixed, papers are most valuable to the community
# when they act in service of the reader, creating foundational knowledge and
# communicating as clearly as possible."""
# output_filename = "output.mp3"
# text_to_speech(text, output_filename)

# LOCAL_FILE = "generated_image.png"
# NAME_FOR_S3 = "image/generated_image.png"

# s3_client.upload_file("generated_image.png", AWS_S3_BUCKET_NAME, "image/generated_image.png")
