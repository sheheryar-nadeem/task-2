import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  user: User | any;

  constructor(private authService: AuthService) {
    var familiesList = JSON.parse(localStorage.getItem('families') || '[]');
    if (familiesList.length == 0) {
      localStorage.setItem(
        'families',
        JSON.stringify([
          { id: 1, name: 'Ahmed Khurrum', relation: 'Base Node' },
          { id: 2, name: 'Kareem Khurrum', relation: 'Brother' },
          { id: 3, name: 'Sultan Khurrum', relation: 'Brother' },
          { id: 4, name: 'Azhar Khurrum', relation: 'Brother' },
          { id: 5, name: 'Faiz Ahmed ', relation: 'Son' },
          { id: 6, name: 'Hina Khurrum', relation: 'Wife' },
          { id: 7, name: 'Shugufta', relation: 'Mother' },
          { id: 8, name: 'Alina', relation: 'Mother-in-Law' },
          { id: 9, name: 'Khurrum Javed', relation: 'Father' },
          { id: 10, name: 'Zaid', relation: 'Father-in-Law' },
          { id: 11, name: 'Sabiha', relation: 'Sister' },
        ])
      );
    }
    this.authService.authUser.subscribe((x) => (this.user = x));
  }

  logout() {
    this.authService.logout();
  }
}
