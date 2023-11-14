import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SendFeedbackService } from '../../Services/MailServices/send-feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  formfedback = new FormGroup({
    email: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
  });
  constructor(private feedbackservice: SendFeedbackService) {} // Inyecta tu servicio

  onSubmit() {
    const correo = this.formfedback.value.email!;
    const comentario = this.formfedback.value.comments!;

    this.feedbackservice.sendData({ correo, comentario }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
