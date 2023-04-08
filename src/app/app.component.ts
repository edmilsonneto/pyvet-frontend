import { Component } from '@angular/core';
import { PyvetService } from './pyvet.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pyvet';

  recognition = new webkitSpeechRecognition();
  transcript = '';
  isRecording = false;
  btnText = 'Iniciar Reconhecimento de Fala';
  textareaText = '';


  constructor(private pivetService: PyvetService) { }


  startRecognition(): void {
    this.transcript = '';
    this.recognition.lang = 'pt-BR';
    this.recognition.start();
    this.isRecording = true;
    this.btnText = 'Processando...';

    this.recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      this.transcript = event.results[0][0].transcript;
      console.log('TRANSCRIPT NA CHAMADA', this.transcript);

      this.isRecording = false;
      this.recognition.stop();
      this.pivetService.sendMessage(this.transcript).subscribe((data) => {
        this.transcript = data.response;
        this.speach();
        this.btnText = 'Iniciar Reconhecimento de Fala';
        this.textareaText = this.transcript;
      });
    };
  }

  speach() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = this.transcript;
    window.speechSynthesis.speak(msg);
  }
}
