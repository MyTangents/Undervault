import { App } from './render/ui/app';
import { TITLE } from './title';

document.title = TITLE;

const root = document.getElementById('app');
if (root) {
  const app = new App(root);
  app.start();
  // a handle for poking at the running game from the browser console while developing
  if (import.meta.env.DEV) (window as unknown as { __app: App }).__app = app;
}
