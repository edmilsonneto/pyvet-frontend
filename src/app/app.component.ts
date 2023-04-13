import { Component } from '@angular/core';
import { PyvetService } from './pyvet.service';
import { tap } from 'rxjs';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pyvet';
  transcript = '';
  isRecording = false;
  btnText = 'Iniciar Reconhecimento de Fala';
  textareaText = '';

  constructor(private pivetService: PyvetService) { }

  startRecognition(): void {
    this.btnText = 'Processando...';
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.start();
    this.isRecording = !this.isRecording;

    recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      this.transcript = event.results[0][0].transcript;
      console.log('TRANSCRIPT NA CHAMADA msg: ', this.transcript);

      this.isRecording = !this.isRecording;
      recognition.stop();
      this.pivetService.sendMessage(this.transcript).pipe(
        tap(e => this.successFunc(e.response))
      ).subscribe();
    };
  }

  speach(): void {
    let msg = new SpeechSynthesisUtterance();
    msg.text = this.textareaText;
    window.speechSynthesis.speak(msg);
  }

  successFunc(response: string): void {
    this.textareaText = response;
    this.speach();
    this.btnText = 'Iniciar Reconhecimento de Fala';
  }
}
