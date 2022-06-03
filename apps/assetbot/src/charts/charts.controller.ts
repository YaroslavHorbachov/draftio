import { ChartModel } from '@draftio/shared-models';
import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChartsService } from '../shared/services/charts.service';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get()
  public getTypes() {
    // TODO
  }

  @Get()
  public getEditions() {
    // TODO
  }

  @Get()
  public getRarity() {
    // TODO
  }

  @Get('names')
  public getAllNames(): Observable<ChartModel> {
    return this.chartsService.getAllNames();
  }
}
