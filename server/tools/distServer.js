import webpack from 'webpack';
import config from '../webpack.config.dev';

webpack(config).run(function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
});