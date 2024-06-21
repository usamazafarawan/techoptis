import { Routes } from '@angular/router';
import { ImmobillierComponent } from './immobillier/immobillier.component';
import { CalendarImmobillierComponent } from './immobillier/calendar-immobillier/calendar-immobillier.component';
import { EditImmobillierComponent } from './immobillier/edit-immobillier/edit-immobillier.component';
import { ListImmobillierComponent } from './immobillier/list-immobillier/list-immobillier.component';
import { ManageImmobillierComponent } from './immobillier/manage-immobillier/manage-immobillier.component';
import { ServiceImmobillierComponent } from './immobillier/service-immobillier/service-immobillier.component';
import { EditComponent } from './immobillier/edit/edit.component';

import { VoyageurComponent } from './voyageur/voyageur.component';
import { AbonnementComponent } from './voyageur/abonnement/abonnement.component';
import { ChatbotComponent } from './voyageur/chatbot/chatbot.component';
import { FactureComponent } from './voyageur/facture/facture.component';
import { FacturePaiementComponent } from './voyageur/facture-paiement/facture-paiement.component';
import { ListLocationComponent } from './voyageur/list-location/list-location.component';
import { PrestationComponent } from './voyageur/prestation/prestation.component';
import { ReservationComponent } from './voyageur/reservation/reservation.component';
import { DescriptionComponent } from './voyageur/description/description.component';
import { LoginComponent } from './voyageur/login/login.component';
import { signupComponent } from './voyageur/signup/signup.component';

const routes: Routes = [
  {
    path: 'immobilier', component: ImmobillierComponent, children: [
      { path: 'calendar', component: CalendarImmobillierComponent },
      { path: 'edit', component: EditComponent },
      { path: 'edit/:id', component: EditImmobillierComponent },
      { path: 'list', component: ListImmobillierComponent },
      { path: 'manage/:id', component: ManageImmobillierComponent },
      { path: 'service', component: ServiceImmobillierComponent },
    ]
  },
  {
    path: 'voyageur', component: VoyageurComponent, children: [
      { path: 'abonnement', component: AbonnementComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'facture', component: FactureComponent },
      { path: 'facture-paiement', component: FacturePaiementComponent },
      { path: 'list-location', component: ListLocationComponent },
      { path: 'prestation', component: PrestationComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'description/:id', component: DescriptionComponent }, 
      { path: 'se-connecter', component: LoginComponent }, 
      { path: 'registre', component: signupComponent }, 
    ]
  },
  // { path: 'abonnement', component: AbonnementComponent },
  // {path: 'chatbot', component: ChatbotComponent },
  // { path: 'registre', component: signupComponent }, 
  { path: '', redirectTo: '/voyageur/registre', pathMatch: 'full' },
  { path: '**', redirectTo: '/voyageur/registre' }
];

export { routes };
