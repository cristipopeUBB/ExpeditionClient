import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-planet',
  templateUrl: './modal-edit-planet.component.html',
  styleUrls: ['./modal-edit-planet.component.scss']
})
export class ModalEditPlanetComponent implements OnInit{
  @Input() planetInfo: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editPlanetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editPlanetForm = this.fb.group({
      id: [0, Validators.min(0)],
      description: ['', Validators.maxLength(350)],
      status: ['', Validators.required],
      imagePath: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    if (this.planetInfo) {
      this.updateFormValue();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['planetInfo'] && this.planetInfo) {
      this.updateFormValue();
    }
  }

  updateFormValue() : void {
    this.editPlanetForm.patchValue({
      id: Number(this.planetInfo.id),
      description: this.planetInfo.description,
      status: this.planetInfo.status,
      imagePath: this.planetInfo.imagePath,
      name: this.planetInfo.name,
    });
  }

  onSave() : void {
    if (this.editPlanetForm.valid) {
      this.save.emit(this.editPlanetForm.value);
    }
  }

  onCancel() : void {
    this.cancel.emit();
  }
}
