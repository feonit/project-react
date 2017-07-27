export default class ServerData{
    constructor(params = {}){
        let { dateFetch = null } = params

        this.dateFetch = dateFetch
        this.dateCreate = new Date()

        if ("undefined" === typeof this.isFetched){
            throw Error('isFetched must be realized')
        }
    }
}