// Configuration
const config = {
  bambooUrl: 'https://your-bamboo-server.com',
  apiKey: 'your-api-key',
  buildPlans: ['plan-1', 'plan-2'],
};

// Styling
const styling = {
  gradientOne: "#3C91E6",
  gradientTwo: "#FFFFFF"
}

// Global Array of JSON objects (key, value)
// key: string
// value: string
let results = [];

async function load() {
  for (const buildPlan of config.buildPlans) {
    let request = new Request(config.bambooUrl + buildPlan);
    request.headers = { "Authorization": `Bearer ${config.apiKey}` };
    
    let responses = await request.loadJSON(); 
    
    let latestBuild = responses[0]; // Using [0] since that is the latest build
    
    for (const envStatus of latestBuild.environmentStatuses) {
      let name = latestBuild.deploymentProject.name + " ";
      name += envStatus.environment.name;
      
      let deploymentState = envStatus.deploymentResult.deploymentState;
      
      results.push({
        "name": name,
        "deploymentState": deploymentState
      });  
    }
  }
}

// Create linear gradient background for widget
function createGradientBackground() {
    // Linear Gradient Background
    let gradient = new LinearGradient();
    gradient.colors = [new Color(styling.gradientOne), new Color(styling.gradientTwo)];
    gradient.startPoint = new Point(0,0);
    gradient.endPoint = new Point(10,10);
    gradient.locations = [0, 0.30];

    return gradient;
}

// Populate listwidgets data with build results
function populateWidgetData(listwidget) {
  results.forEach((result) => {
    let row = listwidget.addStack();
    row.setPadding(0, 0, 15, 0);
    row.centerAlignContent();
    
    let planName = row.addText(result.name);
    planName.font = new Font("Avenir Next", 20);
    planName.lineLimit = 2;
    
    row.addSpacer();
    
    let rightStack = row.addStack();

    let isSuccess = result.deploymentState === "SUCCESS";
    let backIcon = isSuccess ? SFSymbol.named("xmark.circle.fill") : SFSymbol.named("checkmark.circle.fill");

    let backImg = rightStack.addImage(backIcon.image);
    backImg.imageSize = new Size(30, 30)

    backImg.tintColor = isSuccess ? Color.green() : Color.red();
  });
}

// Creates the actual widget
async function createWidget() { 
  let gradient = createGradientBackground();

  // Create new empty ListWidget instance
  let listwidget = new ListWidget();
  listwidget.backgroundGradient = gradient;
    
  // Create Title Stack
  let titleStack = listwidget.addStack();
  titleStack.layoutHorizontally();
  titleStack.centerAlignContent();
  titleStack.size = new Size(300, 50);
  titleStack.setPadding(0, 0, 10, 0);

  // Create Title
  let title = titleStack.addText("Bamboo Build Status");
  title.font = new Font("Avenir Next", 30);

  // Request Build Statuses
  await load();

  // Populate Widget with result data
  populateWidgetData(listwidget);

  // Return the created widget
  return listwidget;
}

// "Main Function"
let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} 
else {
  // Show the large widget inside the app
  widget.presentLarge();
}

// Inform script completion
Script.complete();