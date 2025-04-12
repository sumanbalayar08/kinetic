import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) throw new UnauthorizedException('invalid email or password');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('invalid email or password');

    const token = await this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_SECRET_KEY,
      },
    );
    return { 
      status: true, 
      message: "User Logged In Successfully",
      user,
      token 
    };  }
  
  async signUp(signupDto: SignUpUserDto) {
    const { password } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      ...signupDto,
      password: hashedPassword,
    });

    await user.save();

    const token = await this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    return { 
      status: true, 
      message: "User Created Successfully",
      user,
      token 
    };
  }
}
