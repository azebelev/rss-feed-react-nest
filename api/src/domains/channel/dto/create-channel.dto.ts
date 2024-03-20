import { IsUrl } from 'class-validator';

export class CreateChannelDto {
    @IsUrl()
    feedUrl: string;
}
