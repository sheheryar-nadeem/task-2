import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Family } from 'src/app/models/family';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  form: FormGroup | any;
  id: string | any;
  isAddMode: boolean | any;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private familyService: FamilyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      relation: ['', Validators.required],
    });

    if (!this.isAddMode) {
      var getMember = this.familyService.getMemberById(this.id);
      this.form.patchValue(getMember);
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.isAddMode) {
      this.createMember();
    } else {
      this.updateMember();
    }
  }

  private createMember() {
    this.familyService.addMember(this.form.value);

    this.toastr.success('Member added successfully');
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private updateMember() {
    this.familyService.updateMember(this.id, this.form.value);
    this.toastr.success('Member Update successful');
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
