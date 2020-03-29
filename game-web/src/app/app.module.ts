import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PathService } from './common/path/path.service';
import { BoardService } from './board/board.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PathService, BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
