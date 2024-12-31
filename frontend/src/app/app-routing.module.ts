import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductVerificationComponent } from './components/product-verification/product-verification/product-verification.component';
import { QrScanComponent } from './components/product-verification/qr-scan/qr-scan.component';
import { DetailsComponent } from './components/product-verification/details/details.component';
import { HistoryComponent } from './components/product-verification/history/history.component';
import { SearchComponent } from './components/product-verification/search/search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManufacturersComponent } from './components/manufacturers/manufacturers/manufacturers.component';
import { ListManufacturersComponent } from './components/manufacturers/list-manufacturers/list-manufacturers.component';
import { AddManufacturersComponent } from './components/manufacturers/add-manufacturers/add-manufacturers.component';
import { EditManufacturersComponent } from './components/manufacturers/edit-manufacturers/edit-manufacturers.component';
import { DetailsManufacturersComponent } from './components/manufacturers/details-manufacturers/details-manufacturers.component';
import { ListDistributorsComponent } from './components/distributors/list-distributors/list-distributors.component';
import { AddDistributorsComponent } from './components/distributors/add-distributors/add-distributors.component';
import { EditDistributorsComponent } from './components/distributors/edit-distributors/edit-distributors.component';
import { DetailsDistributorsComponent } from './components/distributors/details-distributors/details-distributors.component';
import { DistributorsComponent } from './components/distributors/distributors/distributors.component';
import { ListPharmaciesComponent } from './components/pharmacies/list-pharmacies/list-pharmacies.component';
import { pharmaciesComponent } from './components/pharmacies/pharmacies/pharmacies.component';
import { EditPharmacieComponent } from './components/pharmacies/edit-pharmacie/edit-pharmacie.component';
import { AddpharmacieComponent } from './components/pharmacies/add-pharmacie/add-pharmacie.component';
import { TransactionListComponent } from './components/Transaction/transaction-list/transaction-list.component';
import { AddTransactionComponent } from './components/Transaction/add-transaction/add-transaction.component';
import { TransactionDetailsComponent } from './components/Transaction/transaction-details/transaction-details.component';
import { TransactionsComponent } from './components/Transaction/transactions/transactions.component';


  

const routes: Routes = [

  {path:"show-all-employees",component: EmployeeListComponent},
  {path:"add-employee", component: AddEmployeeComponent},
  {path:'', redirectTo: "dashboard", pathMatch:"full"},
  {path:'updating-by-id/:id',component:UpdateEmployeeComponent},
  {path:'details-of-employee/:id',component:ShowDetailsComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {
    path: 'manufacturers',
    component: ManufacturersComponent,
    children: [
      { path: 'list-manufacturers', component:ListManufacturersComponent  },
      { path: 'add-manufacturers', component: AddManufacturersComponent },
      { path: 'edit-manufacturers', component: EditManufacturersComponent },
      { path: 'details-manufacturers', component: DetailsManufacturersComponent },
      { path: '', redirectTo: 'list-manufacturers', pathMatch: 'full' }

    ]
  },
  {
  path: 'distributors',
    component: DistributorsComponent,
    children: [
      { path: 'list-distributors', component: ListDistributorsComponent },
      { path: 'add-distributors', component: AddDistributorsComponent },
      { path: 'edit-distributors', component:EditDistributorsComponent  },
      { path: 'details-distributors', component: DetailsDistributorsComponent },
      { path: '', redirectTo: 'list-distributors', pathMatch: 'full' }

    ]
  },
  {
    path: 'pharmacies',
      component: pharmaciesComponent,
      children: [
        { path: 'list-parmacies', component: ListPharmaciesComponent },
        { path: 'add-pharmacie', component: AddpharmacieComponent },
        { path: 'edit-pharmacie', component:EditPharmacieComponent  },
        { path: 'details-pharmacie', component: pharmaciesComponent },
        { path: '', redirectTo: 'list-parmacies', pathMatch: 'full' }
  
      ]
    },

    {
      path: 'transactions',
        component: TransactionsComponent,
        children: [
          { path: 'list-transactions', component: TransactionListComponent},
          { path: 'add-transaction', component: AddTransactionComponent },
          { path: 'details-transaction', component: TransactionDetailsComponent },
          { path: '', redirectTo: 'list-transactions', pathMatch: 'full' }
    
        ]
      },
    
  

  {
    path: 'product-verification',
    component: ProductVerificationComponent,
    children: [
      { path: 'qr-scan', component: QrScanComponent },
      { path: 'search', component: SearchComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'history', component: HistoryComponent },
      { path: '', redirectTo: 'qr-scan', pathMatch: 'full' }  // Redirige vers la page de scan par défaut
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
