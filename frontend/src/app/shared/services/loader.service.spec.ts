import {LoaderService} from "./loader.service";

describe('loader service', () => {

  let loaderService: LoaderService;
  beforeEach(() => {
    loaderService = new LoaderService();
  });

  it('should emit true value for showing loader', (done: DoneFn) => {
    loaderService.isShowed$.subscribe(value => {
      expect(value).toBe(true);
      done();                               // используется для завершения теста в асинхронных функциях
    });

    loaderService.show();
  });

  it('should emit false value for hiding loader', (done: DoneFn) => {
    loaderService.isShowed$.subscribe(value => {
      expect(value).toBe(false);
      done();                               // используется для завершения теста в асинхронных функциях
    });

    loaderService.hide();
  });

});
