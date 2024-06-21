import { Component } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  messages: Message[] = [];
  value: string='';

  constructor(public chatService: ChatService) { }

  
  ngOnInit() {
    this.chatService.conversation.subscribe((val:any) => {
    this.messages = this.messages.concat(val);
  });
}

sendMessage() {
  this.chatService.getBotAnswer(this.value);
  this.value = '';
}

}
