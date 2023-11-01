import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-live-model',
  templateUrl: './live-model.component.html',
  styleUrls: ['./live-model.component.css']
})
export class LiveModelComponent {
  camera_link: string = "http://192.168.0.100:4747/";
  videoUrl: string;
  status: string = "";
  recorded_video_url : string = "";
  tutorial_video_url : string = "data/Faridpur_7.mp4";
  video_similarity_score: string = "";

  constructor(private httpClient : HttpClient){
    this.videoUrl = 'http://localhost:8086/'; // Replace with the actual URL
  }


  ngOnInit(): void {
    this.updateVideoStream();
  }

  updateVideoStream() {
    const videoElement = document.getElementById('videoStream') as HTMLImageElement;
    videoElement.src = this.videoUrl;
    setTimeout(() => this.updateVideoStream(), 1000); // Update the image every 1 second
  }

  set_camera_address(){
    const data = {
      "camera_url": this.camera_link
    };
    this.httpClient.post('http://localhost:8086/api/v1/camera/set',data) //https://api.agify.io?name=abhijit
    .subscribe((response)=>{
      console.log(response);
    });
  }

  start_recording(){
    this.httpClient.get<any>("http://localhost:8086/api/v1/camera/start_recording")
    .subscribe((response)=>{
      this.status = response.message;
    })
  }
  stop_recording(){
    this.httpClient.get<any>("http://localhost:8086/api/v1/camera/stop_recording")
    .subscribe((response)=>{
      this.status = response.message;
      this.recorded_video_url = response.video_url;
    })
  }

  calculate_video_similarity(){
    const data = {
      tutorial_uri: this.tutorial_video_url,
      performance_video_uri: this.recorded_video_url,
      selected_model_name: "uwu"
    }
    this.video_similarity_score = "Calculating...";
    this.httpClient.post<any>("http://localhost:8086/api/v1/video/similarity", data)
    .subscribe((response)=>{
      console.log(response);
      this.video_similarity_score = response;
    })
  }
}
