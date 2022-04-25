import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/models/family';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  families: Family[] | any;
  user: User[] | any;

  constructor(
    private familyService: FamilyService,
    private authService: AuthService
  ) {
    this.familyService.familyDetail.subscribe((x) => (this.families = x));
    this.authService.authUser.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  deleteMember(id: number) {
    this.familyService.deleteMember(id);
  }
}
