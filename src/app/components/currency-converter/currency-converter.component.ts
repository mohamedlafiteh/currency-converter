import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Currency } from '../../models/currency.model';
import { CurrencyApiService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  private fb = inject(FormBuilder);
  private api = inject(CurrencyApiService);

  currencies = signal<Currency[]>([]);
  converted = signal<number | null>(null);

  form = this.fb.group({
    amount: [100, [Validators.required, Validators.min(0)]],
    from: ['USD', Validators.required],
    to: ['EUR', Validators.required],
  });

  constructor() {
    this.api.getCurrencies()
      .subscribe(list => {
        let arr= Object.entries(list)
      .map(([c, v]) =>{
        return v
      })

       this.currencies.set(arr);
      });


    this.form.valueChanges.subscribe(v => {
      if (!this.form.valid) return;

      this.api.convertAmount(v.from!, v.to!, Number(v.amount))
        .subscribe({
          next: res => this.converted.set(res.response.value),
          error: err => console.error(err)
        });
    });
  }

  swap() {
    const { from, to } = this.form.getRawValue();
    this.form.patchValue({ from: to!, to: from! });
  }

  trackByCode = (_: number, c: Currency) => c.short_code;
}
