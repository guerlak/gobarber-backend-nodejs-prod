import { inject, injectable } from "tsyringe";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUserRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";

@injectable()
class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(user_id: string): Promise<User[] | undefined> {
    let cacheProviders = await this.cacheProvider.get<User[]>(
      `providers-list:${user_id}`
    );
    // let cacheProviders = null;
    if (!cacheProviders) {
      console.log("Query DB => Providers List");
      let providers = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(providers)
      );

      return providers;
    }
    return cacheProviders;
  }
}
export default ListProvidersService;
