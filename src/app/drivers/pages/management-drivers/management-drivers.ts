import {Component, inject} from '@angular/core';
import {Driver} from '../../models/driver.model';
import {DriverService} from '../../services/driver.service';
import {MatDialog} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CreateDriverDialog} from '../../components/create-driver-dialog/create-driver-dialog';
import {DeleteDriverDialog} from '../../components/delete-driver-dialog/delete-driver-dialog';
import {OrdersLayoutComponent} from '../../../orders/pages/orders-layout/orders-layout';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-management-drivers',
  imports: [
    MatButton,
    FormsModule,
    MatFormField,
    MatLabel,
    MatFormField,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatFormField,
    MatLabel,
    MatIcon,
    MatProgressSpinner,
    MatCardSubtitle,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './management-drivers.html',
  styleUrl: './management-drivers.css'
})
export class ManagementDrivers {
  private driverService = inject(DriverService);
  private dialog = inject(MatDialog);

  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  isLoading = true;
  searchTerm = '';
  private searchTerms = new Subject<string>();

  ngOnInit() {
    this.loadDrivers();

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoading = true;
        return this.driverService.getAllDrivers();
      })
    ).subscribe(drivers => {
      this.drivers = drivers;
      this.filterDrivers();
      this.isLoading = false;
    });
  }

  loadDrivers(): void {
    this.isLoading = true;
    this.driverService.getAllDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.filteredDrivers = [...this.drivers];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterDrivers(): void {
    if (!this.searchTerm) {
      this.filteredDrivers = [...this.drivers];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.fullName.toLowerCase().includes(term) ||
      driver.dni.toLowerCase().includes(term) ||
      driver.email.toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    this.searchTerms.next(this.searchTerm);
  }

  openCreateDriverDialog(): void {
    const dialogRef = this.dialog.open(CreateDriverDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.driverService.createDriver(result).subscribe({
          next: () => {
            this.loadDrivers();
          },
          error: (err) => {
            console.error('Error creating driver:', err);
          }
        });
      }
    });
  }

  openDeleteConfirmationDialog(driver: Driver): void {
    const dialogRef = this.dialog.open(DeleteDriverDialog, {
      data: {
        title: 'Eliminar Conductor',
        message: `¿Estás seguro de que deseas eliminar a ${driver.fullName} (${driver.dni})?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDriver(driver.dni);
      }
    });
  }

  private deleteDriver(dni: string): void {
    this.driverService.deleteDriver(dni).subscribe({
      next: () => {
        this.loadDrivers();
      },
      error: (err) => {
        console.error('Error deleting driver:', err);
      }
    });
  }
}
