import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { StartConversationInput } from './dto/start-conversation.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async startCoversation(startConversationInput: StartConversationInput) {
    const memberOne = await this.prisma.user.findUnique({
      where: {
        email: startConversationInput.userOneEmail,
      },
    });

    if (!memberOne) {
      throw new NotFoundException('member one was not found');
    }

    if (memberOne.id === startConversationInput.userTwoId) {
      throw new BadRequestException('cannot message yourself');
    }


    let existingConversation = await this.prisma.conversation.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId: memberOne.id,
          userTwoId: startConversationInput.userTwoId,
        },
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });

    if (!existingConversation) {
      existingConversation = await this.prisma.conversation.findUnique({
        where: {
          userOneId_userTwoId: {
            userOneId: startConversationInput.userTwoId,
            userTwoId: memberOne.id,
          },
        },
        include: {
          userOne: true,
          userTwo: true,
        },
      });
    }
    if (existingConversation) {
      console.log('Conversation already exists');
      return existingConversation;
    }

    const createConversation = await this.prisma.conversation.create({
      data: {
        userOneId: memberOne.id,
        userTwoId: startConversationInput.userTwoId,
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });


    return createConversation;
  }

  findAll() {
    return `This action returns all conversation`;
  }

  async findConversationAndCurrentUser(id: string, email: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id: id,
      },
      include: {
        userOne: true,
        userTwo: true,
        directMessages: {
          include: {
            user: true,
          },
        },
      },
    });

    let conversationUser;

    if (conversation.userOne.id !== currentUser.id) {
      conversationUser = conversation.userOne;
    } else if (conversation.userTwo.id !== currentUser.id) {
      conversationUser = conversation.userTwo;
    }

    return { conversation, currentUser, conversationUser };
  }

  async findAllUserConversationsByEmail(email: string,) {
     const user = await this.prisma.user.findUnique({
       where: { email: email },
       include: {
         conversationsInitiated: {
           include: {
             userOne: true,
             userTwo:true,
           }
         },
         conversationsReceived: {
            include: {
             userOne: true,
             userTwo:true,
           }
         }
       },
     });
    
     if (!user) {
       throw new NotFoundException('User not found');
    }
    const allConversationUsers = []
    user.conversationsInitiated.forEach(item => {
      if (item.userOneId !== user.id) {
        allConversationUsers.push(item.userOne);
      } else if(  item.userTwoId !== user.id) {
      
        allConversationUsers.push(item.userTwo);
      }
    })
    user.conversationsReceived.forEach(item => {
      if (item.userOneId !== user.id) {
        allConversationUsers.push(item.userOne);
      } else if(  item.userTwoId !== user.id) {
      
        allConversationUsers.push(item.userTwo);
      }
    })
    
    return allConversationUsers;
    
  }
}
