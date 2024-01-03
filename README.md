# hannahbot_main
![hannah_image1 (1)](https://github.com/ThaFirstPaul/hannahbot_main/assets/34832378/c0b24833-4aa3-4275-a518-c83f15976f5b)
**hannahbot is the leading bot in its class. That being the class of being donk.**

Many features are included by default, and the bot is easily customisable with a little programming. The default commands can be found listed here: https://thafirstpaul.github.io/hannahbot_web/#commands

# Installation 
Download and install node:
https://github.com/nodejs/node#download

Download the latest release of hannahbot:
[Hannahbot Releases](https://github.com/ThaFirstPaul/hannahbot_main/releases/latest)

# Configuration
Apply the correct auth-tokens:
- Go to the directory where you downloaded hannahbot and unzip it
- Enter the folder created by unzipping
- Open *.env*
- Add the oauth token for your personal account to *TWITCH_OAUTH_TOKEN_1=""* (between the speechmarks)
- Add tokens for any further features you want to enable
  - If you want to use your account as the bot, use the OAUTH token of your personal account for both *TWITCH_OAUTH_TOKEN_1* and *TWITCH_OAUTH_TOKEN_OWNER*.

# Running
- Open Terminal (macos/linux) or CMD (windows)
- Type `cd ` (with a space after cd)
- Drag (or copy and paste the path of) the folder where hannahbot is saved into the command line. Hit Enter.
- Run `node main.js`

When running for the first time, you will be asked to download dependencies.

Options are:
- `--debug`
- `--fulldebug`
- `--gen_commands`
- `--storage-readonly`

# Issues
Please report issues to me at:\
https://github.com/ThaFirstPaul/hannahbot_main/issues

You can run hannahbot with debug enabled:
`node main.js --fulldebug`
