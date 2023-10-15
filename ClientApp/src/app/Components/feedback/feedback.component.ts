import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SendFeedbackService } from 'src/app/Services/send-feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  constructor(private feedbackservice: SendFeedbackService) {} // Inyecta tu servicio

  onSubmit(form: NgForm) {
    const correo = form.value.floatingInputGrid;
    const comentario = form.value.validationTextarea;

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
