const URL = "/tasks"

export const createTask = async(data) => {
    try {
        const request = await fetch(URL,{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
              "Content-Type":"application/json"
            }})
    } catch (error) {
        console.log(error);
    }
};

export const getAllTasks = async() => {
    try {
        const request = await fetch(URL);
        const data = await request.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updateOneTask = async(id, data) => {
    try {
        const request = await fetch(`${URL}/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.log(error);
    }
};

export const deleteAllTasks = async() => {
    try {
        await fetch(URL,{method: "DELETE"})
    } catch (error) {
        console.log(error);
    }
};

export const deleteOneTask = async(id) => {
    try {
        await fetch(`${URL}/${id}`,{method: "DELETE"});
    } catch (error) {
        console.log(error);
    }
}
