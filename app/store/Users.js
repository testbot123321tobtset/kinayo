Ext.define('X.store.Users', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.User',
        storeId: 'UsersStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    }
});
