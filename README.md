<p align="center">
  <a href="https://github.com/tobiasbueschel/awesome-hyperapp/">
    <img alt="Git Standup Slackbot" src="/img/logo.png" width="700">
  </a>
</p>

<div align="center">

<p align="center">
  A simple Slack app that shows you all commits within a repository in the last 24h.
</p>

<p align="center">
  <a href="https://github.com/tobiasbueschel/git-standup-slackbot/pulls"><img alt="Pull Requests Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

<p align="center">
<i>Looking for contributors. Submit a pull request if you have something to add.</i><br>
</p>
</div>

<br>

<p align="center">
<img alt="Slack Add Request URL for Slash Command" src="/img/command.gif" width="700">

<br>

<p align="center">
<a href="https://slack.com/oauth/authorize?scope=commands&client_id=10472182098.165651347217">
<img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
</a>
</p>
</p>

<br>

## Development
> In case you want to customize `git-standup-slackbot` and not use the above "add to Slack" button, you can deploy the application yourself as well.

#### 1. Deployment
The easiest way to get up and running is to deploy the app to [Heroku](https://heroku.com). Alternatively, you may of course deploy the application elsewhere or on `localhost`.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tobiasbueschel/git-standup-slackbot)

#### 2. Slack Setup
Go to your integrations page at Slack `(http://my.slack.com/services/new)` and search for "Slash Commands". Click on the "Add" button.

<p align="center">
    <img alt="Slack Add Slash Command" src="https://a.slack-edge.com/2acb/img/api/articles/intro-slash-commands-add-slash-command.png" width="700">
</p>

Create the text command itself. This is the text that the user will type after the slash. We use `/git-standup`.
<p align="center">
    <img alt="Slack Create Slash Command" src="https://a.slack-edge.com/2acb/img/api/articles/intro-slash-commands-create-command.png" width="700">
</p>

Configure the request URL of the Slash Command to the URL on which the `git-standup-slackbot` is running.
<p align="center">
    <img alt="Slack Add Request URL for Slash Command" src="https://cloud.githubusercontent.com/assets/13087421/24824387/8a98344e-1c0a-11e7-87b8-122b393b8f87.png" width="700">
</p>

#### 3. Test Command
After deploying and configuring the "Slash Command" in Slack you are able to use the command with the name you gave in step 2.

## Usage
Git-Standup-Slackbot takes the GitHub username and the name of a public repository as arguments.

```
/git-standup username repository
```
