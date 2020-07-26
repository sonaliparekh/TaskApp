import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DialogComponent } from './dialog/dialog.component';
import { List } from './models/list.model';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TaskApp';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  lists: List[] = [];

  constructor(public dialog: MatDialog, private overlay: OverlayContainer) {}
  addNewList(name: string): void {
    const index = this.lists.findIndex(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (index === -1) {
      this.lists.push({
        name,
        id: this.lists.length,
        cards: [],
      });
    } else {
      // show notification
    }
  }

  addNewCard(listId: number, name: string): void {
    if (listId !== null && listId !== undefined) {
      this.lists[listId].cards.push({
        id: this.lists[listId].cards.length,
        name,
      });
    }
  }

  openDialog(
    type: string,
    id?: number,
    isEdit?: boolean,
    name?: string,
    cardId?: number
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '260px',
      data: { type, name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (type === 'list' && !isEdit) {
          this.addNewList(result);
        } else if (type === 'list' && isEdit) {
          this.editList(id, result);
        } else if (type === 'card' && !isEdit) {
          this.addNewCard(id, result);
        } else if (type === 'card' && isEdit) {
          this.editCard(id, cardId, result);
        }
      }
    });
  }

  editList(listId: number, name: string): void {
    this.lists[listId].name = name;
  }

  editCard(listId: number, id: number, name: string): void {
    this.lists[listId].cards[id].name = name;
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteItem(listId: number, id?: number): void {
    if (id !== undefined) {
      this.lists[listId].cards.splice(id, 1);
    } else {
      this.lists.splice(listId, 1);
    }
  }

  confirmationDialog(type: string, listId: number, id?: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '260px',
      data: { type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (type === 'list') {
          this.deleteItem(listId);
        } else if (type === 'card') {
          this.deleteItem(listId, id);
        }
      }
    });
  }

  toggleTheme(): void {
    if (this.overlay.getContainerElement().classList.contains('dark-theme')) {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.add('light-theme');
    } else if (this.overlay.getContainerElement().classList.contains('light-theme')) {
      this.overlay.getContainerElement().classList.remove('light-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlay.getContainerElement().classList.add('light-theme');
    }
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }
}
