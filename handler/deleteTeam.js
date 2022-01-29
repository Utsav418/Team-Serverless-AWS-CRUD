const connectToDatabase = require('../config/db') // initialize connection

// simple Error constructor for handling HTTP error codes
function HTTPError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}
module.exports.deleteTeam = async(event) => {
    try {
        const { Team } = await connectToDatabase()
        const team = await Team.findByPk(event.pathParameters.id)
        if (!team) throw new HTTPError(404, `Team with id: ${event.pathParameters.id} was not found`)
        await team.destroy()
        return {
            statusCode: 200,
            body: JSON.stringify(team)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could destroy fetch the Team.'
        }
    }
}