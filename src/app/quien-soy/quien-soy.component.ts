import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../services/github.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})

export class QuienSoyComponent implements OnInit{
  userData: any;
  constructor(private githubService: GithubService){}

  ngOnInit(): void {
    this.githubService.getUser('Yaninaponcec94').subscribe({
      next: data => this.userData = data,
      error: err=>console.error('❌ error al obtener los datos de github',err)
    });
  }
}
