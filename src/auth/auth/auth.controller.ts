import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtGuard)
  @Get('test-auth')
  findAll() {
    return this.authService.findAll();
  }
}
