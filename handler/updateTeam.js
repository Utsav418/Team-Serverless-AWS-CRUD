const connectToDatabase = require('../config/db') // initialize connection

// simple Error constructor for handling HTTP error codes
function HTTPError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}
module.exports.updateTeam = async(event) => {
    try {
        const input = JSON.parse(event.body)
        const { Team } = await connectToDatabase()
        const team = await Team.findByPk(event.pathParameters.id)
        if (!team) throw new HTTPError(404, `Team with id: ${event.pathParameters.id} was not found`)
        if (input.full_name) team.full_name = input.full_name
        if (input.short_name) team.short_name = input.short_name
        if (input.home_ground) team.home_ground = input.home_ground
        if (input.anthem) team.logo = input.logo
        if (input.staffe) team.staffe = input.staffe
        if (input.description) team.description = input.description
        await team.save()
        return {
            statusCode: 200,
            body: JSON.stringify(team)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not update the Team.'
        }
    }
}