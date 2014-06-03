Ext.define('X.model.validation.UserLogin', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'username'
            },
            {
                name: 'password'
            },
            {
                name: 'phoneNumber'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'username',
                message: 'You will need a username to continue.'
            },
            {
                type: 'presence',
                field: 'password',
                message: 'How could you forget to enter your password?'
            },
            {
                type: 'presence',
                field: 'phoneNumber',
                message: 'Your device\'s phone number is required to continue. We only use it to authenticate you – we will never share it with anyone else without your explicit permission.'
            }
        ]
    }
});