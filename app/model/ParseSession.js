Ext.define('X.model.ParseSession', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {
                name: 'id'
            },
            {
                name: 'token',
                type: 'string'
            }
        ],
        proxy: {
            type: 'localstorage',
            id  : 'parse-session'
        }
    }
});
