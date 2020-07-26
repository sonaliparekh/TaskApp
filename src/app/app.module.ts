import { MaterialModule } from './material/material.module';
// global imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// local imports
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [AppComponent, DialogComponent, ConfirmationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
