import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { RecaptchaService } from '../../../application/services/recaptcha.service';
import { VerifyRecaptchaDto } from '../dtos/verify-recaptcha.dto';

@ApiTags('Security')
@Controller('recaptcha')
export class RecaptchaController {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify reCAPTCHA token',
    description:
      'Validates a reCAPTCHA token. In simulation mode, accepts "OK" as valid. Returns success status and optional error message.',
  })
  @ApiResponse({
    status: 200,
    description: 'Validation result',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string', nullable: true },
      },
    },
  })
  async verifyRecaptcha(@Body() dto: VerifyRecaptchaDto) {
    return this.recaptchaService.validateToken(dto.token);
  }
}
