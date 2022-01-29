const connectToDatabase = require('../config/db') // initialize connection

// simple Error constructor for handling HTTP error codes
function HTTPError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}
module.exports.getTeam = async(event) => {
    try {
        const { Team } = await connectToDatabase()
        const team = await Team.findByPk(event.pathParameters.id)
        if (!team) throw new HTTPError(404, `Team with id: ${event.pathParameters.id} was not found`)
        return {
            statusCode: 200,
            body: JSON.stringify(team)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch the team.'
        }
    }
}

module.exports.getAllTeam = async() => {
    try {
        const { Team } = await connectToDatabase()
        const teams = await Team.findAll()
        return {
            statusCode: 200,
            body: JSON.stringify(teams)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the teamss.'
        }
    }
}