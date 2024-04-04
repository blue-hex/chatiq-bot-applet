# ChatiQ-Applet

**Description:**

ChatiQ-Applet is a powerful npm package that empowers you to integrate the ChatiQ chat functionality seamlessly within your web applications. It provides a streamlined approach to adding real-time LLM based capabilities, enhancing user engagement and communication.

**Installation:**

There are two primary methods to install ChatiQ-Applet:

**Method 1: Using npm**

1. **Prerequisites:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can verify this by running `node -v` and `npm -v` in your terminal. If not installed, download them from the official Node.js website: [https://nodejs.org/en](https://nodejs.org/en).
2. **Open your terminal:** Navigate to your project's root directory using the `cd` command.
3. **Install the package:** Run the following command to install ChatiQ-Applet from the npm registry:

   ```bash
   npm install chatiq-applet
   ```

**Method 2: Using unpkg CDN**

1. **Include the script:** Directly reference the ChatiQ-Applet script from the unpkg CDN in your HTML file's `<head>` section:

   ```html
   <script src="https://unpkg.com/chatiq-applet"></script>
   <script src="https://cdn.tailwindcss.com"></script> // Component Styling Dependancy 
   ```

**Usage:**

Once installed, you can leverage ChatiQ-Applet's functionality within your JavaScript code:

```javascript
	<script>
		chatLib.initChat('pass_your_unique_bot_id'); // intialize your iQ bot
	</script>
```

**Important:**

For detailed configuration options and usage examples, consult the official ChatiQ-Applet documentation, which can be found at [https://www.chatiq.ai/](https://www.chatiq.ai/) (replace with the actual documentation URL).

**Contributing:**

We welcome contributions to the ChatiQ-Applet project! If you'd like to get involved, please refer to the contribution guidelines outlined in the CONTRIBUTING.md file within the project's repository.
