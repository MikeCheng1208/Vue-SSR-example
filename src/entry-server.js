//entry-server.js
import { createApp } from './index.js';
export default  function(context){
  return new Promise((resolve, reject) => {
        const { app, router } = createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }resolve(app);
        }, reject);
    });
}