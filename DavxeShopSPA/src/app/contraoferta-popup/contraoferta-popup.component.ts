import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contraoferta-popup',
  standalone: false,
  templateUrl: './contraoferta-popup.component.html',
  styleUrl: './contraoferta-popup.component.css'
})
export class ContraofertaPopupComponent {
  @Input() isVisible: boolean = false;
  @Input() offerPreview: { nombre: string; imagenUrl: string } | null = null;

  @Output() send = new EventEmitter<{ amount: number; }>();
  @Output() closed = new EventEmitter<void>();

  amount: number | null = null;
  message: string = '';

  close() {
    this.isVisible = false;
    this.closed.emit();
  }

  sendCounterOffer() {
    if (this.amount && this.amount > 0) {
      this.send.emit({ amount: this.amount });
      this.close();
    }
  }
}