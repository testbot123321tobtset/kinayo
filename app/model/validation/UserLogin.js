Ext.define('X.model.validation.UserLogin', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'username'
            },
            {
                name: 'password'
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
            }
        ]
    }
});