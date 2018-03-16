jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const wd = require('wd');
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");
const caps = {"platformName":"iOS","platformVersion":"11.2","deviceName":"iPhone Simulator","app":"/Users/manuelrdsg/Documents/Workspaces/React_Native/ReactNative-Todo-FB/TodoApp/ios/build/Build/Products/Debug-iphonesimulator/TodoApp.app","automationName":"XCUITest"};


beforeAll(async () => {
    await driver.init(caps);
    await driver.sleep(2000); // wait for app to load
})

test('Adding Task', async () => {
    await (new wd.TouchAction(driver))
    .tap({x: 183, y: 622})
    .perform()
  await (new wd.TouchAction(driver))
    .tap({x: 168, y: 476})
    .perform()
  await (new wd.TouchAction(driver))
    .tap({x: 90, y: 480})
    .perform()
  await (new wd.TouchAction(driver))
    .tap({x: 55, y: 530})
    .perform()
  await (new wd.TouchAction(driver))
    .tap({x: 165, y: 473})
    .perform()
  await (new wd.TouchAction(driver))
    .tap({x: 328, y: 641})
    .perform()
});

test('Removing task', async () => {
    await (new wd.TouchAction(driver))
     .tap({x: 120, y: 93})
     .perform()
    await driver.quit();
});

// main().catch(console.log);
