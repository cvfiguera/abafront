import { AbaAdminPage } from './app.po';

describe('aba-admin App', () => {
  let page: AbaAdminPage;

  beforeEach(() => {
    page = new AbaAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
