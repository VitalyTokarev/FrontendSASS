export const getEditElement = (value, key, array) => {
    const indexEditElement = array.findIndex(element => element[key] === value);
    const editElement = {};

    for(const key in array[indexEditElement] ) {
        editElement[key] = array[indexEditElement][key];
    };

    editElement.index = indexEditElement;
    return editElement;
};

export const removeElementFromArray = (value, key, array) => {
    const removeIndex = array.findIndex(element => element[key] === value);
    
    return array.filter((_, index) => index !== removeIndex);
};

export const getEditArray = (element, key, editArray)  => {
    const editIndex = editArray.findIndex(item => item[key] === element[key]);

    return editArray.map( (item, index) => {
        if(index === editIndex) {
            const editElement = {};
            for(const key in element) {
                editElement[key] = element[key];
            }
            return editElement;
        }
        return {...item};
    });

}; 

