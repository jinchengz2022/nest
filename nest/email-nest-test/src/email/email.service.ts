import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.163.com',
      port: 25,
      secure: false,
      auth: {
        user: this.configService.get('email_user'),
        pass: this.configService.get('email_password'),
      },
    });
  }

  async sendMail(params: { to: string; subject: string; html?: any }) {
    const { to, subject, html } = params;
    await this.transporter.sendMail({
      from: {
        name: 'sys email',
        address: 'jinchengz202011@163.com',
      },
      to,
      subject,
      html,
    });

    return true;
  }
}
