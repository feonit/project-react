import config from './config'

let apiPath = {
    "specialities": "/thesaurus/specialities",
    "patients":     id => `/patients/${id}`,
    "medics":       id => '/medics'     + (id ? `/${id}` : ''),
    "clinics":      id => '/clinics'    + (id ? `/${id}` : ''),
    "receptions":   (patientId, receptionId) => `/patients/${patientId}/receptions` + (receptionId ? `/${receptionId}` : ''),
};
if (config.NODE_ENV === "test"){
    let local = {};
    Object.keys(apiPath).forEach(key=>{
        let type = typeof apiPath[key];
        if (type === "string"){
            local[key] = '/' + key
        } else if (type === "function") {
            local[key] = id => `/${key}/${id}`;
        }
    })
    apiPath = local
}

export default apiPath
