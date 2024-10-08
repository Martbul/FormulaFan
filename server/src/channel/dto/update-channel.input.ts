import { CreateChannelInput } from './create-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelInput extends PartialType(CreateChannelInput) {
  @Field(() => Int)
  id: number;
}
