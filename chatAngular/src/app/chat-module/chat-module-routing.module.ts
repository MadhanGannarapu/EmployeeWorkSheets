import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { LinksComponent } from './links/links.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chat', component: UserComponent },
  { path: 'admin', component: ChatComponent },
  { path: 'links', component: LinksComponent },
  { path: 'chat/link/:id', component: LinksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatModuleRoutingModule { }
