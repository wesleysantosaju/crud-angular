import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar, MatSnackBarDismiss, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private Location: Location){

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  deleteCourse(courseId: string) {
    // Exibe o snackbar com a mensagem de confirmação e os botões de ação
    const snackBarRef = this._snackBar.open(
      'Tem certeza de que deseja excluir este curso?',
      'Confirmar', // Botão "Confirmar"
      {
        duration: 10000, // Duração do snackbar em milissegundos (10 segundos neste exemplo)
      }
    );

    // Constante representando o valor do botão "Confirmar"
    const CONFIRM_ACTION = 'confirmar';

    // Adiciona um botão "Cancelar" ao snackbar e monitora os cliques
    snackBarRef.onAction().subscribe(() => {
      // Se o usuário clicar em "Confirmar", prossegue com a exclusão
      this.courseService.deleteCourseById(courseId).subscribe(
        () => {
          console.log('Course deleted successfully.');
          // Exibe uma mensagem de sucesso usando o MatSnackBar
          this._snackBar.open('Curso deletado com sucesso', 'Fechar', {
            duration: 2000, // Duração em milissegundos (3 segundos neste exemplo)
          });

          // Aguarda um pequeno intervalo antes de recarregar a página
          setTimeout(() => {
            // Recarrega a página após a exclusão bem-sucedida
            window.location.reload();
          }, 2000); // Tempo de espera em milissegundos (2 segundos neste exemplo)
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    });
  }
}
