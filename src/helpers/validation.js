const regValidateExpressionEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

export const checkEmptyAndLength = (
    item,
    name = 'поля', 
    requiredLength = 0, 
    required = true
    ) => {
        if ( !required && !item) {
            return ''            
        } 

        if( !item ) {
            return 'Необходимо заполнить поле!'
        }

        if ( requiredLength && item.length < requiredLength ) {
            return `Длинна ${name} меньше ${requiredLength} символов!`;
        }

        return '';
};

export const validationEmail = email => {
    if ( !email.match(regValidateExpressionEmail) ) {
        return 'Почтовый адрес некорректен!';
    }

    return '';
};

