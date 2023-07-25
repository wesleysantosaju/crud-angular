import { Component } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute){

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
