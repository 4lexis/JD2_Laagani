import { AngularappPage } from './app.po';

describe('angularapp App', () => {
  let page: AngularappPage;

  beforeEach(() => {
    page = new AngularappPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
