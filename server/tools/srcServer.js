import webpack from 'webpack';
import config from '../webpack.config.dev';

webpack(config).watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
}, function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
});