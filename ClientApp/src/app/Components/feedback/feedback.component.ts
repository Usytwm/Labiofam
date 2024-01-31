import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MailService } from '../../Services/MailServices/mail.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Mail } from '../../Interfaces/Mail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  formfedback = new FormGroup({
    sendername: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
  });
  matcher = new ErrorStateMatcher();
  constructor(
    private feedbackservice: MailService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {} // Inyecta tu servicio
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    const mail: Mail = {
      sendername: this.formfedback.value.sendername!,
      email: this.formfedback.value.email!,
      subject: this.formfedback.value.subject!,
      message: this.formfedback.value.comments!,
    };

    this.feedbackservice
      .sendData(mail.sendername, mail.email, mail.subject, mail.message)
      .subscribe(
        (response) => {
          this._snackBar.open('Enviado con éxito', 'cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
          });
          // this.formfedback.reset();
          this._router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
