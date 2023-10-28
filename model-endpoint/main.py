from fastapi import FastAPI
from pydantic import BaseModel
from trained_model.sign_recognition import predict_sign
from trained_model.video_similarity import calculate_video_similarity

class VideoSimilarityRequest(BaseModel):
    tutorial_uri: str
    performance_video_uri: str
    selected_model_name: str 

class SignRecognitionRequest(BaseModel):
    sign_image_uri: str
    selected_model_name: str

app = FastAPI()

@app.get("/", response_model=str)
async def root_requests():
    return "FastAPI Server is running."

@app.post("/api/v1/video/similarity", response_model=float)
async def video_similarity(videos : VideoSimilarityRequest):
    return calculate_video_similarity(videos.tutorial_uri, videos.performance_video_uri)

@app.post("/api/v1/image/recognize/sign", response_model=str)
async def video_similarity(request: SignRecognitionRequest):
    return predict_sign(request.sign_image_uri)


