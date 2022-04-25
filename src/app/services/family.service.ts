import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Family } from '../models/family';

@Injectable({ providedIn: 'root' })
export class FamilyService {
  private familySubject: BehaviorSubject<Family[]>;
  public familyDetail: Observable<Family[]>;

  constructor() {
    this.familySubject = new BehaviorSubject<Family[]>(
      JSON.parse(localStorage.getItem('families') || '[]')
    );
    this.familyDetail = this.familySubject.asObservable();
  }

  addMember(member: Family) {
    let newArray = this.familySubject.value;
    newArray.push({
      id: newArray?.length + 1,
      name: member?.name,
      relation: member?.relation,
    });

    localStorage.setItem('families', JSON.stringify(newArray));
    this.familySubject.next(newArray);
  }

  updateMember(id: number, params: Family) {
    let oldArray = this.familySubject.value;
    let newArray = oldArray.map((item: Family, i: number) => {
      if (item.id == id) {
        item.name = params.name;
        item.relation = params.relation;
        return item;
      }
      return item;
    });

    localStorage.setItem('families', JSON.stringify(newArray));
    this.familySubject.next(newArray);
  }

  deleteMember(id: number) {
    let newArray = this.familySubject.value.filter((x: any) => x.id != id);

    localStorage.setItem('families', JSON.stringify(newArray));
    this.familySubject.next(newArray);
  }

  getMemberById(id: number) {
    return this.familySubject.value.filter((x: any) => x.id == id)?.[0];
  }
}
