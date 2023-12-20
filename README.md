# Bamboo Scriptable Widget

![Bamboo Widget Preview](link_to_preview_image.png)

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Bamboo Scriptable Widget** is a JavaScript-based widget for the [Scriptable](https://scriptable.app/) app that provides a convenient way to monitor the status of Bamboo build plans directly from either your iOS or macOS device's home screen.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- [Scriptable App](https://scriptable.app/) installed on your iOS or macOS device.

## Installation

1. Clone or download the repository:

    ```bash
    git clone https://github.com/your-username/bamboo-scriptable-widget.git
    ```

2. Open the Scriptable app.

3. Create a new script by tapping the "+" icon and paste the contents of `bamboo-widget.js` into the script editor.

4. Save the script and exit the Scriptable app.

5. Add a Scriptable widget to your iOS or macOS home screen.

6. Edit the widget, and choose the "Bamboo Widget" script you just created.

7. Resize the widget according to your preferences.

8. Enjoy real-time Bamboo build plan status updates on your home screen!

## Usage

The Bamboo Scriptable Widget will automatically fetch and display the status of your configured build plans. Tap the widget to open the Scriptable app for more details.

## Configuration

Customize the widget by modifying the configuration options within the script. Edit the `config` object to set your Bamboo server URL, API key, and specific build plans to monitor.

```javascript
const config = {
    bambooUrl: 'https://your-bamboo-server.com',
    apiKey: 'your-api-key',
    buildPlans: ['plan-1', 'plan-2'],
};
```

## Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Follow the contribution guidelines for details.

## License
This project is licensed under the MIT License.