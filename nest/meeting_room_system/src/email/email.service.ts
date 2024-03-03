import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('nodemailer_host'),
      port: configService.get('port'),
      secure: false,
      auth: {
        user: configService.get('nodemailer_auth_user'),
        pass: configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail(params: { to: string; subject: string; html?: any }) {
    const { to, subject, html } = params;
    await this.transporter.sendMail({
      from: {
        name: 'sys email',
        address: this.configService.get('nodemailer_auth_user'),
      },
      to,
      subject,
      html,
    });

    return true;
  }
}
