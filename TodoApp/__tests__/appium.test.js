jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const wd = require('wd');
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");
const caps = {"platformName":"iOS","platformVersion":"11.3","deviceName":"iPhone Simulator","app":"/Users/manuelrdsg/Documents/Workspaces/React_Native/ReactNative-Todo-FB/TodoApp/ios/build/Build/Products/Debug-iphonesimulator/TodoApp.app","automationName":"XCUITest"};


beforeAll(async () => {
    await driver.init(caps);
    await driver.sleep(2000); // wait for app to load
})

test('Adding Task', async () => {
  let el5 = await driver.elementByXPath("(//XCUIElementTypeOther[@name=\"Enter new task…\"])[1]");
  await el5.click();
  await el5.sendKeys("Test");
  let el6 = await driver.elementByXPath("//XCUIElementTypeStaticText[@name=\"\"]");
  await el6.click();
});

test('Removing task', async () => {
    // await (new wd.TouchAction(driver))
    //  .tap({x: 120, y: 93})
    //  .perform()
    // await driver.quit();
    await (new wd.TouchAction(driver))
    .tap({x: 296, y: 250})
    .perform()
      
  await (new wd.TouchAction(driver))
    .tap({x: 148, y: 570})
    .perform()
      
  // await driver.quit();  
    

});

// main().catch(console.log);
