import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { ContactComponent } from 'src/app/components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'home',
        component: MainComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
