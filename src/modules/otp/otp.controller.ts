import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpCreateDto, OtpValidateDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  // OTP yaratish
  @Post('generate')
  generateOtp(@Body() otpCreateDto: OtpCreateDto) {
    const otpData = this.otpService.generateOtpWithExpiry(10); // 10 daqiqalik OTP
    this.otpService.storeOtp(otpCreateDto.email, otpData); // OTP'ni saqlaymiz
    return { message: 'OTP created and sent', otp: otpData.otp }; // OTPni yuborish uchun boshqa funksiyalarni qo‘shing
  }

  // OTP tasdiqlash
  @Post('validate')
  validateOtp(@Body() otpValidateDto: OtpValidateDto) {
    const isValid = this.otpService.validateOtp(
      otpValidateDto.email,
      otpValidateDto.otp,
    );
    if (!isValid) {
      return { message: 'Invalid or expired OTP' };
    }
    return { message: 'OTP is valid' };
  }
}
