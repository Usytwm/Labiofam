import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SendFeedbackService } from '../../Services/MailServices/send-feedback.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  formfedback = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    comments: new FormControl('', [Validators.required]),
  });
  matcher = new ErrorStateMatcher();
  constructor(private feedbackservice: SendFeedbackService) {} // Inyecta tu servicio
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    const correo = this.formfedback.value.email!;
    const comentario = this.formfedback.value.comments!;
    console.log({ correo, comentario });

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
