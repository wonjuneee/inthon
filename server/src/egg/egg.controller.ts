import { Get, Body, Param, Controller, Logger, BadRequestException} from '@nestjs/common';
import { EggService } from './egg.service';
import { GetButterfliesResDto } from './dto/get-butterflies-req.dto';

@Controller('egg')
export class EggController {
    private readonly logger = new Logger(EggController.name);
    constructor(private eggService: EggService) {}

    @Get('get-butterflies/:username')
    async getButterflies(@Param('username') username:string): Promise<GetButterfliesResDto> {
        this.logger.log('Get butterflies data');
        if (!username) throw new BadRequestException('username이 전송되지 않았습니다.');
        const butterflies = await this.eggService.getButterflies(username);
        return {eggs : butterflies};
    }
}

