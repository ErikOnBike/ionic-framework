import { newSpecPage } from '@stencil/core/testing';

import { Modal } from '../../../components/modal/modal';
import { Toast } from '../../../components/toast/toast';

describe('overlays: scroll blocking', () => {
  it('should not block scroll when the overlay is created', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <ion-modal></ion-modal>
      `,
    });

    const body = page.doc.querySelector('body')!;

    expect(body).not.toHaveClass('backdrop-no-scroll');
  });

  it('should block scroll when the overlay is presented', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <ion-modal></ion-modal>
      `,
    });

    const modal = page.body.querySelector('ion-modal')!;
    const body = page.doc.querySelector('body')!;

    await modal.present();

    expect(body).toHaveClass('backdrop-no-scroll');

    await modal.dismiss();

    expect(body).not.toHaveClass('backdrop-no-scroll');
  });

  it('should not block scroll when the overlay is dismissed', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <ion-modal></ion-modal>
      `,
    });

    const modal = page.body.querySelector('ion-modal')!;
    const body = page.doc.querySelector('body')!;

    await modal.present();

    expect(body).toHaveClass('backdrop-no-scroll');

    await modal.dismiss();

    expect(body).not.toHaveClass('backdrop-no-scroll');
  });

  it('should not enable scroll until last overlay is dismissed', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <ion-modal id="one"></ion-modal>
        <ion-modal id="two"></ion-modal>
      `,
    });

    const modalOne = page.body.querySelector('#one') as HTMLIonModalElement;
    const modalTwo = page.body.querySelector('#two') as HTMLIonModalElement;
    const body = page.doc.querySelector('body')!;

    await modalOne.present();

    expect(body).toHaveClass('backdrop-no-scroll');

    await modalTwo.present();

    expect(body).toHaveClass('backdrop-no-scroll');

    await modalOne.dismiss();

    expect(body).toHaveClass('backdrop-no-scroll');

    await modalTwo.dismiss();

    expect(body).not.toHaveClass('backdrop-no-scroll');
  });

  // Fixes https://github.com/ionic-team/ionic-framework/issues/30112
  it('should not block scroll when the toast overlay is presented', async () => {
    const page = await newSpecPage({
      components: [Toast],
      html: `
        <ion-toast></ion-toast>
      `,
    });

    const toast = page.body.querySelector('ion-toast')!;
    const body = page.doc.querySelector('body')!;

    await toast.present();

    expect(body).not.toHaveClass('backdrop-no-scroll');

    await toast.dismiss();

    expect(body).not.toHaveClass('backdrop-no-scroll');
  });
});
