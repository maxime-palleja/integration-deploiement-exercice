import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environment/environment";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  /**
   * Liste des utilisateurs à afficher.
   * @type {User[]}
   */
  users: User[] = [];

  /**
   * Injecte le service HttpClient pour les appels HTTP.
   * @param {HttpClient} http - Service Angular pour effectuer les requêtes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Méthode appelée au démarrage du composant.
   * Charge les utilisateurs en appelant l'API.
   */
  ngOnInit(): void {
    this.fetchUsers();
  }

  /**
   * Effectue une requête HTTP pour récupérer la liste des utilisateurs depuis l'API.
   * Mets à jour le tableau `users` avec les données reçues.
   */
  fetchUsers(): void {
    this.http.get<User[]>(environment.apiUrl).subscribe(data => {
      this.users = data;
    });
  }

  /**
   * Supprime un utilisateur en appelant l'API avec une requête DELETE.
   * Mets à jour la liste des utilisateurs une fois la suppression réussie.
   *
   * @param {number} id - Identifiant de l'utilisateur à supprimer.
   */
  deleteUser(id: number): void {
    this.http.delete(environment.apiUrl+`/${id}`).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
