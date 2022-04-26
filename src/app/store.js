import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.js';
import { newsApi } from '../services/newsApi.js';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
});