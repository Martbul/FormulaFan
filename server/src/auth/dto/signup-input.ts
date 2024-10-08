import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Field()
 password: string;
}

