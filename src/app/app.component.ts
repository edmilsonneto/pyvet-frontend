import { Component } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pyvet-frontend';

  recognition = new webkitSpeechRecognition();
  transcript = '';
  isRecording = false;


  startRecognition(): void {
    this.transcript = ''
    this.recognition.lang = 'pt-BR';
    this.recognition.start();
    this.isRecording = true;
    this.recognition.onresult = (event: { results: { transcript: string; }[][]; }) => {
      this.transcript = event.results[0][0].transcript;
    }
  }

  stopRecognition(): void {
    this.isRecording = false;
    this.recognition.stop();
    this.speach();
  }

  speach() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = this.transcript;
    window.speechSynthesis.speak(msg);
  }
}
