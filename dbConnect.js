// import PocketBase from 'pocketbase'

const PocketBase = require('pocketbase').default;


const pb = new PocketBase('http://127.0.0.1:8090');

const getAuth = async () => {

    const authData = await pb.collection("_superusers").authWithPassword(
        "admin@gmail.com",
        "adminadmin",
    )
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.record.id);
}

// getAuth();


module.exports = {pb,getAuth};

