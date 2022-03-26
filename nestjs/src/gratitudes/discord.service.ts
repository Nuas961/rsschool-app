import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

interface BadgeParams {
  fromGithubId: string;
  toDiscordId: number | null;
  toGithubId: string;
  comment: string;
  gratitudeUrl: string;
}

interface DiscordMessage {
  avatar_url: string;
  content: string;
  username: string;
}

(process.env as any).NODE_TLS_REJECT_UNAUTHORIZED = 0;

@Injectable()
export class DiscordService {
  constructor(private httpService: HttpService) {}

  public async pushGratitude(params: BadgeParams) {
    const mention = params.toDiscordId ? `<@${params.toDiscordId}>` : `**@${params.toGithubId}**`;

    const message: DiscordMessage = {
      avatar_url: `https://github.com/${params.fromGithubId}.png`,
      username: params.fromGithubId,
      content: `${mention}\n${params.comment}`,
    };
    await lastValueFrom(this.httpService.post(params.gratitudeUrl, message));
  }
}
