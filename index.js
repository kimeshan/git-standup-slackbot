const Hapi = require('hapi')
const fetch = require('node-fetch')
const Path = require('path')
const Inert = require('inert')
require('dotenv').config()

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
})

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8080
})

server.register(Inert)

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      listing: true,
      redirectToSlash: true,
      index: true
    }
  }
})

server.route({
  method: 'GET',
  path: '/auth/redirect',
  handler: async function (request, reply) {
    const uri = `https://slack.com/api/oauth.access?code=${request.query.code}` +
                `&client_id=${process.env.SLACK_CLIENT_ID}` +
                `&client_secret=${process.env.SLACK_CLIENT_SECRET}` +
                `&redirect_uri=${process.env.REDIRECT_URI}`

    try {
      const data = await fetch(uri)
      const response = await data.json()
      if (response.ok === 'True') {
        console.error('Error')
        reply(`Error encountered: \n ${JSON.stringify(response)}`).status(200).end()
      } else {
        reply.file('success.html')
      }
    } catch (e) {
      console.error('Error ', e)
      throw new Error(e)
    }
  }
})

server.route({
  method: 'POST',
  path: '/standup',
  handler: async function (request, reply) {
    const user = request.payload.text.split(' ')[0]
    const repo = request.payload.text.split(' ')[1]

    if (user && repo) {
      try {
        const data = await getCommitsSinceYesterday(user, repo)
        const response = {
          'text': `Here are all commits since yesterday for the ${repo} repository.`,
          'username': 'Git-Standup',
          'mrkdwn': false,
          'attachments': data
        }

        const noCommits = {
          'text': `No commits have been made in the ${repo} repository within the last 24h.`,
          'username': 'Git-Standup',
          'mrkdwn': false
        }

        data.length > 0 ? reply(response) : reply(noCommits)
      } catch (error) {
        reply({
          'text': `Usage instruction: /git-standup [username] [repository]`,
          'username': 'Git-Standup'
        })
      }
    } else {
      reply({
        'text': `Usage instruction: /git-standup [username] [repository]`,
        'username': 'Git-Standup'
      })
    }
  }
})

server.start(() => {
  console.info(`Server running at: ${server.info.uri}`)
})

async function getCommitsSinceYesterday (user, repo) {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const yesterdayISO = d.toISOString()

  try {
    const response = []
    const data = await fetch(`https://api.github.com/repos/${user}/${repo}/commits?since=${yesterdayISO}`)
    const commits = await data.json()

    for (let i of commits) {
      const index = i.commit.message.indexOf('\n\n')
      const title = i.commit.message.substring(0, index)
      const text = i.commit.message.substring(index, i.commit.message.length)
      const commit = {
        author_name: i.commit.committer.name,
        ts: ((new Date(i.commit.committer.date)).getTime() / 1000),
        author_icon: i.committer.avatar_url,
        author_link: i.committer.html_url,
        title,
        title_link: i.html_url,
        text
      }

      response.push(commit)
    }

    return response
  } catch (e) {
    console.error('Error ', e)
    throw new Error(e)
  }
}
