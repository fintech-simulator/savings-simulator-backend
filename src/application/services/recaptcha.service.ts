import { Injectable, Logger } from '@nestjs/common';

export interface RecaptchaValidationResult {
  success: boolean;
  message?: string;
}

@Injectable()
export class RecaptchaService {
  private readonly logger = new Logger(RecaptchaService.name);

  /**
   * Validates a recaptcha token
   * For simulation purposes, accepts "OK" as valid
   * Can be enhanced to integrate with Google reCAPTCHA API by:
   * 1. Adding RECAPTCHA_SECRET_KEY to environment
   * 2. Making HTTP request to https://www.google.com/recaptcha/api/siteverify
   * 3. Validating the response
   */
  validateToken(token: string): Promise<RecaptchaValidationResult> {
    // Simulation mode: accept "OK" as valid token
    if (token === 'OK') {
      this.logger.debug('Recaptcha token validated (simulation mode)');
      return Promise.resolve({
        success: true,
      });
    }

    // For demonstration, also accept tokens that start with "test_"
    // This allows frontend testing with different scenarios
    if (token.startsWith('test_valid_')) {
      this.logger.debug('Recaptcha token validated (test mode)');
      return Promise.resolve({
        success: true,
      });
    }

    // Any other token is considered invalid in simulation mode
    this.logger.warn('Invalid recaptcha token received');
    return Promise.resolve({
      success: false,
      message: 'Invalid reCAPTCHA token. Please try again.',
    });
  }

  /**
   * Future implementation for real Google reCAPTCHA validation
   * Uncomment and configure when ready to integrate
   */
  /*
  private async validateWithGoogle(token: string): Promise<RecaptchaValidationResult> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      throw new Error('RECAPTCHA_SECRET_KEY not configured');
    }

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      });

      const data = await response.json();

      return {
        success: data.success,
        message: data.success ? undefined : 'reCAPTCHA validation failed',
      };
    } catch (error) {
      this.logger.error('Error validating reCAPTCHA with Google', error);
      return {
        success: false,
        message: 'Error validating reCAPTCHA. Please try again.',
      };
    }
  }
  */
}
