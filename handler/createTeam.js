const connectToDatabase = require('../config/db') // initialize connection

// simple Error constructor for handling HTTP error codes
function HTTPError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

module.exports.createTeam = async(event) => {
    try {
        const { Team } = await connectToDatabase()
        const team = await Team.create(JSON.parse(event.body))
        return {
            statusCode: 200,
            body: JSON.stringify(team)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the team.'
        }
    }
}