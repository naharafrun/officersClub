import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'customers',
              loadChildren: () => import('./customers/customers.module').then(m=> m.CustomersPageModule)
            },
            {
                path: 'dashboard',
              loadChildren: () => import('./dashboard/dashboard.module').then(m=> m.DashboardPageModule)
            },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export  class HomeRoutingModule {}
