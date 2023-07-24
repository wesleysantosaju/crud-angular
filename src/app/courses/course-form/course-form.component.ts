import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe({
      next: (data) => console.log(data),
          error: () => {
            this.onError();
      },
    });
  }

  onCancel(){

  }

  ngOnInit(): void {

  }

  private onError(){
    this._snackBar.open("Erro ao salvar curso.", "", {duration: 5000});
  }
}
