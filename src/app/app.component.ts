import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UF1ExAlexRamos';
  directorioRaiz: any[] = []

  constructor(private http: HttpClient) {
    //this.obtenerDirectorioRaiz()
    this.readFile5()
    //this.concatenarArchivos();
    this.readFile()
  }
  obtenerDirectorioRaiz() {
    this.http.get<any>('http://localhost:3020/mostraNomsRamos')
      .subscribe(
        response => {
          this.directorioRaiz = response.archivos;
          console.log(this.directorioRaiz); // Puedes mostrar los archivos en la consola para verificar
        },
        error => {
          console.error('Error al obtener el directorio raíz:', error);
        }
      );
  }
  readFile5() {
    this.http.get('http://localhost:3020/readFile5', { responseType: 'text' })
      .subscribe(
        (data: string) => {
          console.log('Contenido del archivo FitxerOrigen.txt:', data);
          this.writeFile5(data); // Llama a writeFile5() con el contenido de Alex.txt
        },
      );
  }
  writeFile5(contenido: string) {
    const nombreArchivo = "UF1_ExamenAaD/UF1_ExamenAaD/Documents/Docs1/FitxerDesti.txt";
    this.http.post<any>('http://localhost:3020/escribir-archivo5', { contenido, nombreArchivo })
      .subscribe(response => {
        console.log('Archivo FitxerDesti.txt actualizado correctamente:', response);
      }, );
  }
  concatenarArchivos() {
    const bufferNom = 'Alex';
    const bufferCognom1 = 'Ramos';
    const bufferCognom2 = 'Espasandin';

    this.http.post('http://localhost:3020/writeBuffersRamos', { bufferNom, bufferCognom1, bufferCognom2})
      .subscribe(
        (response) => {
          console.log(response);
        },
      );
  }
  readFile() {
    this.http.post('http://localhost:3020/llegirImatgesRamos', {responseType: 'text'})
      .subscribe(
        (data)=> {
          console.log('Contenido del archivo: ', data)
        }
      )
  }
}

