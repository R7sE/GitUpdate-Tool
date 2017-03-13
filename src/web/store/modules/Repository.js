import TYPES from '../mutation-types';

const mutations = {


    [TYPES.REPOSITORY_CREATE] (state, data) {
        state.projects.push({
            dirPath: data.dirPath,
            name: data.name,
        });

    }

};

const actions = {

};



export default {
    state: {
        projects: [

        ],
    },
    mutations,
    actions,
};