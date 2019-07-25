import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'


import { ChatModuleRoutingModule } from './chat-module-routing.module';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { LinksComponent } from './links/links.component';

@NgModule({
  declarations: [ChatComponent, LoginComponent, SignupComponent, UserComponent, LinksComponent],
  imports: [
    CommonModule,
    ChatModuleRoutingModule,
    FormsModule
  ]
})
export class ChatModuleModule { }
