import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts'; 
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';


import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BoardAdminComponent } from './components/auth/board-admin/board-admin.component';
import { BoardUserComponent } from './components/auth/board-user/board-user.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QrScanComponent } from './components/product-verification/qr-scan/qr-scan.component';
import { SearchComponent } from './components/product-verification/search/search.component';
import { DetailsComponent } from './components/product-verification/details/details.component';
import { HistoryComponent } from './components/product-verification/history/history.component';
import { ProductVerificationComponent } from './components/product-verification/product-verification/product-verification.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ManufacturersComponent } from './components/manufacturers/manufacturers/manufacturers.component';
import { AddManufacturersComponent } from './components/manufacturers/add-manufacturers/add-manufacturers.component';
import { ListManufacturersComponent } from './components/manufacturers/list-manufacturers/list-manufacturers.component';
import { EditManufacturersComponent } from './components/manufacturers/edit-manufacturers/edit-manufacturers.component';
import { DetailsManufacturersComponent } from './components/manufacturers/details-manufacturers/details-manufacturers.component';
import { ListDistributorsComponent } from './components/distributors/list-distributors/list-distributors.component';
import { AddDistributorsComponent } from './components/distributors/add-distributors/add-distributors.component';
import { EditDistributorsComponent } from './components/distributors/edit-distributors/edit-distributors.component';
import { DetailsDistributorsComponent } from './components/distributors/details-distributors/details-distributors.component';
import { DistributorsComponent } from './components/distributors/distributors/distributors.component';
import { AddpharmacieComponent } from './components/pharmacies/add-pharmacie/add-pharmacie.component';
import { EditPharmacieComponent } from './components/pharmacies/edit-pharmacie/edit-pharmacie.component';
import { ListPharmaciesComponent } from './components/pharmacies/list-pharmacies/list-pharmacies.component';
import { DetailsPharmacieComponent} from './components/pharmacies/details-pharmacie/details-pharmacie.component';
import { pharmaciesComponent } from './components/pharmacies/pharmacies/pharmacies.component';
import { TransactionListComponent } from './components/Transaction/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/Transaction/transaction-details/transaction-details.component';
import { AddTransactionComponent } from './components/Transaction/add-transaction/add-transaction.component';
import { TransactionsComponent } from './components/Transaction/transactions/transactions.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    
    AddEmployeeComponent,
         UpdateEmployeeComponent,
         ShowDetailsComponent,
         AdminLoginComponent,
         LoginComponent,
         RegisterComponent,
         BoardAdminComponent,
         BoardUserComponent,
         ChangePasswordComponent,
         ProfileComponent,
         DashboardComponent,
         QrScanComponent,
         SearchComponent,
         DetailsComponent,
         HistoryComponent,
         ProductVerificationComponent,
         ManufacturersComponent,
         AddManufacturersComponent,
         ListManufacturersComponent,
         EditManufacturersComponent,
         DetailsManufacturersComponent,
         ListDistributorsComponent,
         AddDistributorsComponent,
         EditDistributorsComponent,
         DetailsDistributorsComponent,
         DistributorsComponent,
         AddpharmacieComponent,
         ListPharmaciesComponent,
         pharmaciesComponent,
         DetailsPharmacieComponent,
         EditPharmacieComponent,
         TransactionListComponent,
         TransactionDetailsComponent,
         AddTransactionComponent,
         TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule,
    NgxChartsModule,
    ZXingScannerModule,
    HttpClientModule,FormsModule,HomeComponent, BrowserAnimationsModule , 
    MatFormFieldModule, MatInputModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,
     MatNativeDateModule,
     CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
