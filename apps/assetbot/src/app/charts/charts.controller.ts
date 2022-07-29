import { ChartModel } from '@draftio/shared/common';
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

  @Get('all-colors')
  public getAllColors(): Observable<ChartModel> {
    return this.chartsService.allColors$;
  }

  @Get('common-colors')
  public getCommonColors(): Observable<ChartModel> {
    return this.chartsService.commonColors$;
  }

  @Get('all-names')
  public getAllNames(): Observable<ChartModel> {
    return this.chartsService.allNames$;
  }

  @Get('analysis-all-names')
  public getAnalisysNames(): Observable<ChartModel> {
    return this.chartsService.analysisAllNames$;
  }

  @Get('analysis-colors')
  public getAnalisysColors(): Observable<ChartModel> {
    return this.chartsService.allNames$;
  }
}
