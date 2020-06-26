import { container } from "tsyringe";
import { Request, Response } from "express";
import ListProvidersService from "../../../services/ListProvidersService";
import ListProviderMonthAvailableService from "../../../services/ListProviderMonthAvailableService";
import ListProviderDayAvailableService from "../../../services/ListProviderDayAvailableService";
import { classToClass } from "class-transformer";

class ProvidersController {
  public async listAll(req: Request, res: Response) {
    const id = req.user.id;
    const listProviders = container.resolve(ListProvidersService);
    const providers = await listProviders.execute(id);
    return res.json(classToClass(providers));
  }

  public async showMonthAvailable(req: Request, res: Response) {
    const provider_id = req.params.provider_id;
    const { month, year } = req.query;
    const listProviders = container.resolve(ListProviderMonthAvailableService);
    const providers = await listProviders.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
    return res.json(providers);
  }

  public async showHoursDayAvailable(req: Request, res: Response) {
    const provider_id = req.params.provider_id;
    const { day, month, year } = req.query;
    const hoursList = container.resolve(ListProviderDayAvailableService);
    const available = await hoursList.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return res.json(available);
  }
}
export default ProvidersController;
