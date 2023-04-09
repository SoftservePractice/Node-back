
const next_step_method_list = new Map()
const registerNextStep = async (id, method) => {
    next_step_method_list.set(id, method);
}

const getNextStepList = async () =>{
    return next_step_method_list
}

const deleteNextStep = async (id) =>{
    next_step_method_list.delete(id)
}

module.exports = {registerNextStep, getNextStepList, deleteNextStep}
